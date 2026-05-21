// Documents routes (student-protected).
// GET  / — list document requests for the authenticated student
// POST / — submit a new document request (e.g. transcript, certificate)

const express = require('express');
const router = express.Router();

const { getDocuments, requestDocument } = require('../controllers/documentsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getDocuments);
router.post('/', authMiddleware, requestDocument);

module.exports = router;
