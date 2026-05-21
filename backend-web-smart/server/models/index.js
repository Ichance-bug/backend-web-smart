// Loads all Sequelize models and defines associations between them.
// Import this file anywhere you need access to models.

const sequelize = require('../config/database');

const Student    = require('./Student');
const Admin      = require('./Admin');
const Enrollment = require('./Enrollment');
const Grade      = require('./Grade');
const Attendance = require('./Attendance');
const Payment    = require('./Payment');
const Document   = require('./Document');
const Notification = require('./Notification');
const AuditLog   = require('./AuditLog');
const Config     = require('./Config');

// --- Associations ---
Student.hasMany(Enrollment,   { foreignKey: 'studentId', as: 'enrollments' });
Student.hasMany(Grade,        { foreignKey: 'studentId', as: 'grades' });
Student.hasMany(Attendance,   { foreignKey: 'studentId', as: 'attendance' });
Student.hasMany(Payment,      { foreignKey: 'studentId', as: 'payments' });
Student.hasMany(Document,     { foreignKey: 'studentId', as: 'documents' });
Student.hasMany(Notification, { foreignKey: 'studentId', as: 'notifications' });

Enrollment.belongsTo(Student,   { foreignKey: 'studentId' });
Grade.belongsTo(Student,        { foreignKey: 'studentId' });
Attendance.belongsTo(Student,   { foreignKey: 'studentId' });
Payment.belongsTo(Student,      { foreignKey: 'studentId' });
Document.belongsTo(Student,     { foreignKey: 'studentId' });
Notification.belongsTo(Student, { foreignKey: 'studentId' });

module.exports = {
  sequelize,
  Student,
  Admin,
  Enrollment,
  Grade,
  Attendance,
  Payment,
  Document,
  Notification,
  AuditLog,
  Config,
};
