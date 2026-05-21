// Sequelize model for student payment records.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
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
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  referenceNumber: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  method: {
    type: DataTypes.ENUM('bank_transfer', 'gcash', 'cash', 'online'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'payments',
  timestamps: true,
});

module.exports = Payment;
