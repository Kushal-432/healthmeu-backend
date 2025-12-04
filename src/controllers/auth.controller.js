const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response/response');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return successResponse(res, user, 'Users registed successfully', 201);
  } catch (err) {
    return errorResponse(res, err, 'User registration failed', 500);
  }
};

const login = async (req, res) => {
  const data = await authService.login(req.body);
  return successResponse(res, data, 'Users loggedin successfully', 200);
  try {
  } catch (err) {
    return errorResponse(res, err, 'User Login failed', 500);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const otp = await authService.generateOtp(req.body.email);
    return successResponse(res, [], 'OTP sent to email', 200);
  } catch (err) {
    return errorResponse(res, err, 'Failed to send OTP.', 500);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const user = await authService.verifyOtp(req.body);
    return successResponse(res, user, 'OTP verified', 200);
  } catch (err) {
    return errorResponse(res, err, 'Failed to verify OTP.', 500);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await authService.resetPassword(req.body);
    return successResponse(res, user, 'Password reset successfully', 200);
  } catch (err) {
    return errorResponse(res, err, 'Failed to reset password.', 500);
  }
};

module.exports = { register, login, forgotPassword, verifyOtp, resetPassword };
