// Handles admin authentication.
// adminLogin  — validate admin credentials, issue admin JWT
// adminLogout — stateless logout (client discards token)

const AdminModel = require('../models/adminModel');
const { comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const { success, error } = require('../utils/response');
const config = require('../config/env');

const adminLogin = async (req, res, next) => {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return error(res, 'Admin ID and password are required', 400);
    }

    const admin = await AdminModel.findByAdminId(adminId);
    if (!admin) {
      return error(res, 'Invalid credentials', 401);
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return error(res, 'Invalid credentials', 401);
    }

    const token = signToken(
      { id: admin.id, adminId: admin.adminId, role: admin.role },
      config.JWT_ADMIN_SECRET,
      config.JWT_EXPIRES_IN
    );

    return success(res, { token }, 'Admin login successful');
  } catch (err) {
    next(err);
  }
};

const adminLogout = async (req, res, next) => {
  try {
    return success(res, null, 'Admin logged out successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { adminLogin, adminLogout };
