// Enrollment routes (student-protected).
// GET  / — fetch current enrollment status/details
// POST / — submit a new enrollment request

const express = require('express');
const router = express.Router();

const { getEnrollment, submitEnrollment } = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getEnrollment);
router.post('/', authMiddleware, submitEnrollment);

module.exports = router;
