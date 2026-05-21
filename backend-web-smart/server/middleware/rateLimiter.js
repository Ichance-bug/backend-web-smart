// Rate limiting middleware to protect sensitive endpoints (e.g. login).
// Uses express-rate-limit to cap requests per IP within a time window.

const rateLimit = require('express-rate-limit');

// Stricter limiter for login endpoints — 10 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,  // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

module.exports = { loginLimiter };
