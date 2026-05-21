// Documents controller.
// getDocuments    — list all document requests for the authenticated student
// requestDocument — submit a new document request (e.g. transcript, certificate of enrollment)

const DocumentModel = require('../models/documentModel');
const { success, error } = require('../utils/response');

const getDocuments = async (req, res, next) => {
  try {
    const documents = await DocumentModel.getByStudent(req.user.id);
    return success(res, documents);
  } catch (err) {
    next(err);
  }
};

const requestDocument = async (req, res, next) => {
  try {
    const { type, purpose, copies } = req.body;

    if (!type || !purpose) {
      return error(res, 'Document type and purpose are required', 400);
    }

    const document = await DocumentModel.create({
      studentId: req.user.id,
      type,
      purpose,
      copies: copies || 1,
      status: 'pending',
    });

    return success(res, document, 'Document request submitted', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDocuments, requestDocument };
