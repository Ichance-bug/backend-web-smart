// Notifications routes (student-protected).
// GET        /          — fetch all notifications for the authenticated student
// PATCH      /:id/read  — mark a specific notification as read

const express = require('express');
const router = express.Router();

const { getNotifications, markRead } = require('../controllers/notificationsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getNotifications);
router.patch('/:id/read', authMiddleware, markRead);

module.exports = router;
