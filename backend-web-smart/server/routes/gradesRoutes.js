// Grades routes (student-protected).
// GET /     — fetch all grades for the authenticated student
// GET /gwa  — compute and return the student's General Weighted Average

const express = require('express');
const router = express.Router();

const { getGrades, getGWA } = require('../controllers/gradesController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getGrades);
router.get('/gwa', authMiddleware, getGWA);

module.exports = router;
