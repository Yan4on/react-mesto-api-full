const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError('Необходима авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, (process.env.JWT_SECRET || 'dev-secret'));
  } catch (err) {
    console.log('error');
  }
  req.user = payload;

  return next();
};
