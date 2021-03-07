/* eslint-disable max-len */
const usersRouter = require('express').Router(); // создали роутер
const { Joi, celebrate } = require('celebrate');
// const { userIdValidation, updateUserProfileValidation, updateUserAvatarValidation } = require('../validation/userValidation');
const {
  getUsers, getUserId, getCurrentUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserId);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({ // eslint-disable-next-line
    avatar: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Некорректно указан url'),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
