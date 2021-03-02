require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const { isCelebrate } = require('celebrate');
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');
const { createUserValidation, loginValidation } = require('./validation/userValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Количество запросов привысило допустимое значение, пожалуйста попробуйте позже',
// });

// const allowedCors = [
//   'localhost:3000',
//   'http://yan4on.students.nomoredomains.icu',
//   'http://www.yan4on.students.nomoredomains.icu',
//   'https://yan4on.students.nomoredomains.icu',
//   'https://www.yan4on.students.nomoredomains.icu',
// ];

// app.use(cors());
// app.use((req, res, next) => {
//   const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

//   if (allowedCors.includes(origin)) {
//     // Проверяем, что значение origin есть среди разрешённых доменов
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   }

//   next();
// });

app.use(helmet());
// app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use((err, req, res, next) => {
  const { statusCode = isCelebrate(err) ? 400 : 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
