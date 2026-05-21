// Sequelize model for system-wide configuration.
// Typically a single row — active semester, enrollment open flag, deadlines.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Config = sequelize.define('Config', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  activeSemester: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  enrollmentOpen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enrollmentDeadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  addDropDeadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  paymentDeadline: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'configs',
  timestamps: true,
});

module.exports = Config;
