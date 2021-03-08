const BadRequestErr = require('./bad-request-err');// 400
const AuthError = require('./auth-err');// 401
const ForbidenErr = require('./forbiden-err');// 403
const NotFoundErr = require('./not-found-err');// 404
const ConflictErr = require('./conflict-err');// 409
const InternalServerErr = require('./server-err');// 500

module.exports = {
  BadRequestErr,
  AuthError,
  ForbidenErr,
  NotFoundErr,
  ConflictErr,
  InternalServerErr,
};
