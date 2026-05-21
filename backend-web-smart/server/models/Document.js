// Sequelize model for student document requests (TOR, certificates, etc.).

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
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
  type: {
    type: DataTypes.ENUM(
      'transcript_of_records',
      'certificate_of_enrollment',
      'certificate_of_graduation',
      'good_moral',
      'diploma'
    ),
    allowNull: false,
  },
  purpose: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  copies: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'ready', 'released', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'documents',
  timestamps: true,
});

module.exports = Document;
