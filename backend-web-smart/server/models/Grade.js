// Sequelize model for student grades.
// Each row is one subject grade for one student in one semester.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Grade = sequelize.define('Grade', {
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
  units: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  semester: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'grades',
  timestamps: true,
});

module.exports = Grade;
