// Payment data-access methods using Sequelize.

const { Payment } = require('./index');

const PaymentModel = {
  getByStudent: async (studentId) => {
    return Payment.findAll({ where: { studentId }, raw: true });
  },

  create: async (data) => {
    return Payment.create(data);
  },

  verify: async (id) => {
    await Payment.update({ status: 'verified' }, { where: { id } });
    return Payment.findByPk(id, { raw: true });
  },
};

module.exports = PaymentModel;
