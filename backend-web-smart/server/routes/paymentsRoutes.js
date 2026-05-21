// Payments routes (student-protected).
// GET  / — fetch payment history for the authenticated student
// POST / — submit a new payment record

const express = require('express');
const router = express.Router();

const { getPayments, submitPayment } = require('../controllers/paymentsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getPayments);
router.post('/', authMiddleware, submitPayment);

module.exports = router;
