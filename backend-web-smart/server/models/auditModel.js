// AuditLog data-access methods using Sequelize.

const { AuditLog } = require('./index');

const AuditModel = {
  getAll: async () => {
    return AuditLog.findAll({
      order: [['createdAt', 'DESC']],
      raw: true,
    });
  },

  create: async (data) => {
    return AuditLog.create(data);
  },
};

module.exports = AuditModel;
