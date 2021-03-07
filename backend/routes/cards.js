const cardsRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
// const { createCardValidation, cardIdValidation } = require('../validation/cardValidation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30), // eslint-disable-next-line
    link: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Некорректно указан url'),
  }),
}), createCard);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), deleteCard);

cardsRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), likeCard);
cardsRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardsRouter;
