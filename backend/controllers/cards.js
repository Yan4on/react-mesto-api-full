/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const { JWT_SECRET = 'secret' } = process.env;

function getTokenFromReq(req) {
  const header = req.headers.authorization;
  // eslint-disable-next-line no-return-assign
  return token = header.split(' ')[1];
}
function getIdFromToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded._id;
}
function getIdFromReqHeader(req) {
  const token = getTokenFromReq(req);
  const id = getIdFromToken(token);
  return id;
}

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.setHeader('Content-Type', 'application/json');
      return res.send(JSON.stringify(cards));
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const id = getIdFromReqHeader(req);
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      let error;
      if (err.name === 'ValidationError') {
        error = new BadRequestError('Некорректные данные в запросе');
        return next(error);
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const id = getIdFromReqHeader(req);
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      if (!card.owner.equals(id)) {
        throw new ForbiddenError('Удалить можно только свою карточку');
      }

      Card.deleteOne(card).then(() => res.send(card));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const id = getIdFromReqHeader(req);
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: id } }, { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const id = getIdFromReqHeader(req);

  return Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};
