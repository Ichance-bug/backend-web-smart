// Grades controller.
// getGrades — return all grade records for the authenticated student
// getGWA    — compute and return the student's General Weighted Average

const GradeModel = require('../models/gradeModel');
const { computeGWA, getRemarks } = require('../utils/gwaCalculator');
const { success, error } = require('../utils/response');

const getGrades = async (req, res, next) => {
  try {
    const grades = await GradeModel.getByStudent(req.user.id);
    return success(res, grades);
  } catch (err) {
    next(err);
  }
};

const getGWA = async (req, res, next) => {
  try {
    const grades = await GradeModel.getByStudent(req.user.id);

    if (!grades || grades.length === 0) {
      return error(res, 'No grades available to compute GWA', 404);
    }

    const gwa = computeGWA(grades);
    const remarks = getRemarks(gwa);

    return success(res, { gwa, remarks });
  } catch (err) {
    next(err);
  }
};

module.exports = { getGrades, getGWA };
