// Attendance data-access methods using Sequelize.

const { Attendance } = require('./index');

const AttendanceModel = {
  getByStudent: async (studentId) => {
    return Attendance.findAll({ where: { studentId }, raw: true });
  },
};

module.exports = AttendanceModel;
