// Attendance routes (student-protected).
// GET / — fetch attendance records for the authenticated student

const express = require('express');
const router = express.Router();

const { getAttendance } = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAttendance);

module.exports = router;
