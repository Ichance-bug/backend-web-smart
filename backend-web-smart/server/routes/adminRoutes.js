// Admin routes — covers both admin authentication and admin management actions.
// Auth:
//   POST /login       — rate-limited admin login
//   POST /logout      — admin logout
//   GET  /me          — current admin profile (protected)
// Management (all protected by adminMiddleware):
//   GET   /students        — list all students
//   PATCH /students/:id    — update a student record
//   GET   /requests        — list pending service requests
//   PATCH /requests/:id    — approve/reject a request
//   GET   /audit-log       — view audit trail

const express = require('express');
const router = express.Router();

const { adminLogin, adminLogout } = require('../controllers/adminAuthController');
const {
  getStudents,
  updateStudent,
  getRequests,
  updateRequest,
  getAuditLog,
} = require('../controllers/adminController');
const adminMiddleware = require('../middleware/adminMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

// Auth
router.post('/login', loginLimiter, adminLogin);
router.post('/logout', adminLogout);
router.get('/me', adminMiddleware, (req, res) => {
  res.json({ success: true, data: req.admin });
});

// Management
router.get('/students', adminMiddleware, getStudents);
router.patch('/students/:id', adminMiddleware, updateStudent);
router.get('/requests', adminMiddleware, getRequests);
router.patch('/requests/:id', adminMiddleware, updateRequest);
router.get('/audit-log', adminMiddleware, getAuditLog);

module.exports = router;
