// JWT utility — thin wrappers around jsonwebtoken.
// Centralizes token signing and verification so the secret/algorithm
// is never scattered across the codebase.

const jwt = require('jsonwebtoken');

/**
 * Sign a JWT.
 * @param {object} payload   - Data to encode in the token
 * @param {string} secret    - Signing secret (JWT_SECRET or JWT_ADMIN_SECRET)
 * @param {string} expiresIn - Expiry string e.g. '7d', '1h'
 * @returns {string} Signed JWT string
 */
const signToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verify and decode a JWT.
 * Throws JsonWebTokenError or TokenExpiredError on failure.
 * @param {string} token  - JWT string from Authorization header
 * @param {string} secret - Secret used to sign the token
 * @returns {object} Decoded payload
 */
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { signToken, verifyToken };
