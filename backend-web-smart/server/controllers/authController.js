// Handles student authentication.
// login  — validate credentials, issue JWT
// logout — client-side token invalidation (stateless)
// me     — return the authenticated student's profile

const StudentModel = require('../models/studentModel');
const { comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const { success, error } = require('../utils/response');
const config = require('../config/env');

const login = async (req, res, next) => {
  try {
    const { studentNumber, password } = req.body;

    if (!studentNumber || !password) {
      return error(res, 'Student number and password are required', 400);
    }

    const student = await StudentModel.findByStudentNumber(studentNumber);
    if (!student) {
      return error(res, 'Invalid credentials', 401);
    }

    if (student.isLocked) {
      return error(res, 'Account is locked. Please contact the registrar.', 403);
    }

    const isMatch = await comparePassword(password, student.password);
    if (!isMatch) {
      await StudentModel.updateFailedAttempts(student.id);
      return error(res, 'Invalid credentials', 401);
    }

    // Block locked accounts
    if (student.isLocked) {
      return error(res, 'Account is locked. Please contact the registrar.', 403);
    }

    await StudentModel.resetAttempts(student.id);

    const token = signToken(
      { id: student.id, studentNumber: student.studentNumber },
      config.JWT_SECRET,
      config.JWT_EXPIRES_IN
    );

    return success(res, { token }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    // JWT is stateless — actual invalidation would require a token blacklist or short expiry.
    // For now, instruct the client to discard the token.
    return success(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const student = await StudentModel.findById(req.user.id);
    if (!student) {
      return error(res, 'Student not found', 404);
    }

    // Strip sensitive fields before returning
    const { password, ...safeStudent } = student;
    return success(res, safeStudent);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, logout, me };
