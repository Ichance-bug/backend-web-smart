// Admin data-access methods using Sequelize.

const { Admin } = require('./index');

const AdminModel = {
  findByAdminId: async (adminId) => {
    return Admin.findOne({ where: { adminId }, raw: true });
  },

  findById: async (id) => {
    return Admin.findByPk(id, {
      attributes: { exclude: ['password'] },
      raw: true,
    });
  },
};

module.exports = AdminModel;
