require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

const allowedCors = [
  'localhost:3000',
  'localhost:3001',
  'https://yan4on.students.nomoredomains.icu/',
  'https://api.yan4on.students.nomoredomains.icu/',
];

app.use(cors());
app.use((req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  // eslint-disable-next-line max-len
  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть среди разрешённых доменов
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  }

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', routerUsers);
app.use('/cards', routerCards);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
