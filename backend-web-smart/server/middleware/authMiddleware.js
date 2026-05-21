// Protects student-facing routes.
// Verifies the Bearer JWT in the Authorization header using JWT_SECRET.
// Attaches the decoded payload to req.user on success.

const { verifyToken } = require('../utils/jwt');
const config = require('../config/env');
const { error } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 'Invalid or expired token', 401);
  }
};

module.exports = authMiddleware;
