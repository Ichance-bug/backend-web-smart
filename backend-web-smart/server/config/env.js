// Loads environment variables from .env and validates required keys.
// Throws at startup if any required variable is missing.

const dotenv = require('dotenv');
const path = require('path');

// Load .env from the server/ directory regardless of where the process starts
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const REQUIRED_VARS = [
  'PORT',
  'JWT_SECRET',
  'JWT_ADMIN_SECRET',
  'JWT_EXPIRES_IN',
];

REQUIRED_VARS.forEach((key) => {
  if (process.env[key] === undefined || process.env[key] === null) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const config = {
  PORT:             process.env.PORT,
  JWT_SECRET:       process.env.JWT_SECRET,
  JWT_ADMIN_SECRET: process.env.JWT_ADMIN_SECRET,
  JWT_EXPIRES_IN:   process.env.JWT_EXPIRES_IN,
  NODE_ENV:         process.env.NODE_ENV || 'development',
};

module.exports = config;
