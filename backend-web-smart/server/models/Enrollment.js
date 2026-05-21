// Sequelize model for enrollment records.
// Each record represents a student's enrollment for a given semester.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'students', key: 'id' },
  },
  semester: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  subjects: {
    // Stored as JSON array of subject codes
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'enrollments',
  timestamps: true,
});

module.exports = Enrollment;
