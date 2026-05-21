// Response utility — standardizes the JSON shape returned by all endpoints.
// Every response follows: { success, message, data }

/**
 * Send a successful response.
 * @param {object} res        - Express response object
 * @param {*}      data       - Payload to return
 * @param {string} message    - Human-readable success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
const success = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error response.
 * @param {object} res        - Express response object
 * @param {string} message    - Human-readable error message
 * @param {number} statusCode - HTTP status code (default 500)
 */
const error = (res, message = 'Internal server error', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

module.exports = { success, error };
