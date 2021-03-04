const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
// const AuthError = require('../errors/auth-err');

const { JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NotFoundError('Пользователи в базе данных отсутствуют'))
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email уже используется');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.send({
      name, about, avatar, email,
    })) // {name, about, avatar, email}
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Некорректные данные в запросе');
        return next(error);
      }
      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Некорректные данные в запросе');
        return next(error);
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return res.send({ token });
    })

    .catch(next);
};
