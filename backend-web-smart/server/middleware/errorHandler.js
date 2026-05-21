// Global Express error handler. Must be mounted last (after all routes).
// Handles Sequelize errors, JWT errors, and generic server errors.

const { UniqueConstraintError, ValidationError, DatabaseError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ErrorHandler]', err);
  }

  // Sequelize unique constraint (e.g. duplicate studentNumber, email)
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      message: `Duplicate value: ${err.errors.map((e) => e.path).join(', ')} already exists`,
    });
  }

  // Sequelize validation errors (e.g. null constraint, enum mismatch)
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.errors.map((e) => e.message).join(', '),
    });
  }

  // Sequelize database errors (e.g. bad SQL, connection issues)
  if (err instanceof DatabaseError) {
    return res.status(500).json({
      success: false,
      message: 'Database error',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }

  // Default
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
