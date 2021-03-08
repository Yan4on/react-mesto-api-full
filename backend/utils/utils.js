/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
function getTokenFromReq(req) {
  const header = req.headers.authorization;
  // eslint-disable-next-line no-undef
  return token = header.split(' ')[1];
}
function getIdFromToken(token) {
  // eslint-disable-next-line no-undef
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded._id;
}
function getIdFromReqHeader(req) {
  const token = getTokenFromReq(req);
  const id = getIdFromToken(token);
  return id;
}

module.exports = {
  getTokenFromReq, getIdFromToken, getIdFromReqHeader,
};
