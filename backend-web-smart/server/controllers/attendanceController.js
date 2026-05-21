// Attendance controller.
// getAttendance — return attendance records for the authenticated student

const AttendanceModel = require('../models/attendanceModel');
const { success } = require('../utils/response');

const getAttendance = async (req, res, next) => {
  try {
    const records = await AttendanceModel.getByStudent(req.user.id);
    return success(res, records);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAttendance };
