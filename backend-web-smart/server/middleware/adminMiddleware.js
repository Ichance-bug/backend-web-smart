// Protects admin-facing routes.
// Verifies the Bearer JWT using JWT_ADMIN_SECRET (separate secret from student tokens).
// Attaches the decoded payload to req.admin on success.

const { verifyToken } = require('../utils/jwt');
const config = require('../config/env');
const { error } = require('../utils/response');

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return error(res, 'No admin token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token, config.JWT_ADMIN_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return error(res, 'Invalid or expired admin token', 401);
  }
};

module.exports = adminMiddleware;
