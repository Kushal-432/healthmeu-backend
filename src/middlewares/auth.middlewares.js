const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {errorResponse} = require('../utils/response/response');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN
 
  if (!token) return errorResponse(res,[],'Access denied',401); 

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return errorResponse(res,[],'Invalid token',401);
  }
};

module.exports = authMiddleware;