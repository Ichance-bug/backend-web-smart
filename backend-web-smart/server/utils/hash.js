// Password hashing utility — wraps bcryptjs.
// Salt rounds set to 12 for a good balance of security and performance.

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password.
 * @param {string} plain - The raw password from the user
 * @returns {Promise<string>} Bcrypt hash
 */
const hashPassword = async (plain) => {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

/**
 * Compare a plain-text password against a stored hash.
 * @param {string} plain  - The raw password to check
 * @param {string} hashed - The stored bcrypt hash
 * @returns {Promise<boolean>} True if they match
 */
const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

module.exports = { hashPassword, comparePassword };
