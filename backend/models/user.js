const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина имени от 2 до 30 символов'],
    maxlength: [30, 'Длина имени от 2 до 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Допустимая длина от 2 до 30 символов'],
    maxlength: [30, 'Допустимая длина от 2 до 30 символов'],
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => validator.isURL(link),
      message: (props) => `${props.value} некорректный адрес!`,
    },
  },
  email: {
    type: String,
    required: [true, 'Это поле обязательное для заполнения'],
    unique: [true, 'Пользователь с данным e-mail уже зарегистрирован'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (props) => `${props.value} некорректный email!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Это поле обязательное для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      console.log(`${email} ${password}`);
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          console.log('Ok', matched);
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          console.log(user);
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
