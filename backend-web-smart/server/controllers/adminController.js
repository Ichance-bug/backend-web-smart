// Admin management controller.
// Provides CRUD-like operations for students, service requests, and audit logs.

const StudentModel      = require('../models/studentModel');
const EnrollmentModel   = require('../models/enrollmentModel');
const DocumentModel     = require('../models/documentModel');
const AuditModel        = require('../models/auditModel');
const { success, error } = require('../utils/response');

const getStudents = async (req, res, next) => {
  try {
    const students = await StudentModel.findAll();
    return success(res, students, 'Students retrieved');
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existing = await StudentModel.findById(id);
    if (!existing) {
      return error(res, 'Student not found', 404);
    }

    // Prevent password updates through this endpoint
    delete updates.password;

    const updated = await StudentModel.update(id, updates);

    // Log the action
    await AuditModel.create({
      adminId: req.admin.adminId,
      action: 'UPDATE_STUDENT',
      targetId: String(id),
      details: `Updated fields: ${Object.keys(updates).join(', ')}`,
    });

    return success(res, updated, 'Student updated');
  } catch (err) {
    next(err);
  }
};

const getRequests = async (req, res, next) => {
  try {
    // Returns pending enrollments and document requests combined
    const enrollments = await EnrollmentModel.findAll();
    const documents   = await DocumentModel.findAll();

    const requests = [
      ...enrollments.map((e) => ({ ...e, requestType: 'enrollment' })),
      ...documents.map((d) => ({ ...d, requestType: 'document' })),
    ].filter((r) => r.status === 'pending');

    return success(res, requests, 'Requests retrieved');
  } catch (err) {
    next(err);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, type } = req.body; // type: 'enrollment' | 'document'

    if (!status || !type) {
      return error(res, 'status and type are required', 400);
    }

    let updated;
    if (type === 'enrollment') {
      updated = await EnrollmentModel.updateStatus(id, status);
    } else if (type === 'document') {
      updated = await DocumentModel.updateStatus(id, status);
    } else {
      return error(res, 'Invalid request type', 400);
    }

    if (!updated) {
      return error(res, 'Request not found', 404);
    }

    await AuditModel.create({
      adminId: req.admin.adminId,
      action: `UPDATE_${type.toUpperCase()}_STATUS`,
      targetId: String(id),
      details: `Status changed to ${status}`,
    });

    return success(res, updated, 'Request updated');
  } catch (err) {
    next(err);
  }
};

const getAuditLog = async (req, res, next) => {
  try {
    const logs = await AuditModel.getAll();
    return success(res, logs, 'Audit log retrieved');
  } catch (err) {
    next(err);
  }
};

module.exports = { getStudents, updateStudent, getRequests, updateRequest, getAuditLog };
