// const jwt = require('jsonwebtoken');
// const AuthError = require('../errors/auth-err');

// const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports = (req, res, next) => {
//   // достаём авторизационный заголовок
//   const { Authorization } = req.headers;
//   if (!Authorization || !Authorization.startsWith('Bearer ')) {
//     throw new AuthError('Необходима авторизация');
//   }
//   // извлечём токен
//   const token = Authorization.replace('Bearer ', '');
//   console.log(token);
//   let payload;
//   try {
//     // верифицируем токен
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     throw new AuthError('Необходима авторизация');
//   }
//   req.user = payload; // записываем пейлоуд в объект запроса
//   next();
// };
