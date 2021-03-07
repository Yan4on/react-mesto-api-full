require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { isCelebrate } = require('celebrate');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-err');
const { loginValidation, createUserValidation } = require('./validation/userValidation');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// const allowedCors = [
//   'http://127.0.0.1:3001',
//   'localhost:3000',
//   'http://yan4on.students.nomoredomains.icu',
//   'http://www.yan4on.students.nomoredomains.icu',
//   'https://yan4on.students.nomoredomains.icu',
//   'https://www.yan4on.students.nomoredomains.icu',
// ];

// app.use((req, res, next) => {
//   const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

//   // eslint-disable-next-line eqeqeq
//   if (req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//   } else if (allowedCors.includes(origin)) {
//     // Проверяем, что значение origin есть среди разрешённых доменов
//     res.send().status(202);
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   next();
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'access-control-allow-origin, Authorization',
//   );

//   if (req.method === 'OPTIONS') {
//     res.status(200).send();
//   } else {
//     next();
//   }
// });
app.use(helmet());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(errorLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use('/users', routerUsers, routerUsers);
app.use('/cards', routerCards, routerCards);
app.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

// обработчик ошибок
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
  console.log(`App listening on port ${PORT} 👌`);
});
