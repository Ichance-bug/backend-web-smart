// Grade data-access methods using Sequelize.

const { Grade } = require('./index');

const GradeModel = {
  getByStudent: async (studentId) => {
    return Grade.findAll({ where: { studentId }, raw: true });
  },

  // Returns only units + grade for GWA computation
  getGWA: async (studentId) => {
    return Grade.findAll({
      where: { studentId },
      attributes: ['units', 'grade'],
      raw: true,
    });
  },
};

module.exports = GradeModel;
