// Student data-access methods using Sequelize.

const { Student } = require('./index');

const StudentModel = {
  findById: async (id) => {
    return Student.findByPk(id, { raw: true });
  },

  findByStudentNumber: async (studentNumber) => {
    return Student.findOne({ where: { studentNumber }, raw: true });
  },

  updateFailedAttempts: async (id) => {
    const student = await Student.findByPk(id);
    if (!student) return null;
    student.failedAttempts += 1;
    if (student.failedAttempts >= 5) student.isLocked = true;
    await student.save();
    return student.get({ plain: true });
  },

  resetAttempts: async (id) => {
    await Student.update(
      { failedAttempts: 0, isLocked: false },
      { where: { id } }
    );
  },

  findAll: async () => {
    return Student.findAll({
      attributes: { exclude: ['password'] },
      raw: true,
    });
  },

  update: async (id, data) => {
    await Student.update(data, { where: { id } });
    return Student.findByPk(id, {
      attributes: { exclude: ['password'] },
      raw: true,
    });
  },
};

module.exports = StudentModel;
