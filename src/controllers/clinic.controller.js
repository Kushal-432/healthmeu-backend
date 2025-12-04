const clinicService = require('../services/clinic.service');
const { successResponse, errorResponse } = require('../utils/response/response');

/**
 * ✅ Register Clinic
 */
const registerClinic = async (req, res) => {
  try {
    const clinic = await clinicService.registerClinic(req.body);
    return successResponse(res, clinic, 'Clinic registered successfully', 201);
  } catch (err) {
    return errorResponse(res, err, err.message || 'Clinic registration failed', 400);
  }
};

/**
 * ✅ Login Clinic
 */
const loginClinic = async (req, res) => {
  const data = await clinicService.loginClinic(req.body);
  return successResponse(res, data, 'Clinic logged in successfully', 200);
  try {
  } catch (err) {
    return errorResponse(res, err, err.message || 'Clinic login failed', 400);
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const data = await clinicService.changePassword(req, oldPassword, newPassword);

    return successResponse(res, data, 'Password changed successfully', 200);
  } catch (err) {
    return errorResponse(res, err, err.message || 'Password change failed', 400);
  }
};
const getProfile = async (req, res) => {
  try {
    const clinicId = req.user.id; // ✅ From token set in authMiddleware
    const data = await clinicService.getProfile(clinicId);

    return successResponse(res, data, 'Clinic profile fetched successfully', 200);
  } catch (err) {
    return errorResponse(res, err, err.message || 'Failed to fetch profile', 400);
  }
};

module.exports = {
  registerClinic,
  loginClinic,
  changePassword,
  getProfile,
};
