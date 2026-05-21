// Enrollment data-access methods using Sequelize.

const { Enrollment } = require('./index');

const EnrollmentModel = {
  getByStudent: async (studentId) => {
    return Enrollment.findAll({ where: { studentId }, raw: true });
  },

  create: async (data) => {
    return Enrollment.create(data);
  },

  updateStatus: async (id, status) => {
    await Enrollment.update({ status }, { where: { id } });
    return Enrollment.findByPk(id, { raw: true });
  },

  findAll: async () => {
    return Enrollment.findAll({ raw: true });
  },
};

module.exports = EnrollmentModel;
