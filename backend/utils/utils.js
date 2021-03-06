function getTokenFromReq(req){
    var header = req.headers["authorization"];
    return token = header.split(" ")[1];
  }
  function getIdFromToken(token){  
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded._id;
  }
  function getIdFromReqHeader(req){
    const token = getTokenFromReq(req);
    const id = getIdFromToken(token);
    return id;
  }


module.exports = {
    getTokenFromReq, getIdFromToken, getIdFromReqHeader
}