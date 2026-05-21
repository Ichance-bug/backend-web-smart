// Enrollment controller.
// getEnrollment    — return the student's current enrollment record
// submitEnrollment — create a new enrollment request for the active semester

const EnrollmentModel = require('../models/enrollmentModel');
const ConfigModel = require('../models/configModel');
const { success, error } = require('../utils/response');

const getEnrollment = async (req, res, next) => {
  try {
    const enrollment = await EnrollmentModel.getByStudent(req.user.id);
    if (!enrollment) {
      return error(res, 'No enrollment record found', 404);
    }
    return success(res, enrollment);
  } catch (err) {
    next(err);
  }
};

const submitEnrollment = async (req, res, next) => {
  try {
    const activeSemester = await ConfigModel.getActiveSemester();
    if (!activeSemester) {
      return error(res, 'Enrollment is not currently open', 400);
    }

    // TODO: check if student already has a pending enrollment for this semester
    const enrollment = await EnrollmentModel.create({
      studentId: req.user.id,
      semester: activeSemester,
      ...req.body,
    });

    return success(res, enrollment, 'Enrollment submitted', 201);
  } catch (err) {
    next(err);
  }
};

module.exports = { getEnrollment, submitEnrollment };
