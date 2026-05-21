// Sequelize model for students.
// Handles login credentials, account locking, and basic profile info.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studentNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  course: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  yearLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  failedAttempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isLocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'students',
  timestamps: true,
});

module.exports = Student;
