// Sequelize model for attendance records per subject per student.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
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
  subject: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  semester: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  totalSessions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  attended: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  absences: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  percentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  tableName: 'attendance',
  timestamps: true,
});

module.exports = Attendance;
