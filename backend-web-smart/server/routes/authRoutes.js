// Student authentication routes.
// POST /login  — rate-limited login
// POST /logout — invalidate session
// GET  /me     — return current authenticated student (protected)

const express = require('express');
const router = express.Router();

const { login, logout, me } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

module.exports = router;
