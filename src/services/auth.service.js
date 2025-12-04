const { User } = require('../database/models');
const jwt = require('jsonwebtoken');
const logger = require('../config/log');
const BadRequestError = require('../utils/error/BadRequestError');

// Register user
const register = async (data) => {
  const existing = await User.findOne({ where: { email: data.email } });
  if (existing) throw new BadRequestError('Email already exists');
  const user = await User.create(data);
  return user;
};

// Login user
const login = async ({ email, password }) => {
  const user = await User.scope('withPassword').findOne({ where: { email } });

  if (!user) throw new BadRequestError('Invalid credentials');
  const valid = await user.comparePassword(password);

  if (!valid) throw new BadRequestError('Invalid credentials');

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  return { user, token };
};

// Generate OTP
const generateOtp = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError('User not found');
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();
  // Send OTP via email (implement email sending here)
  logger.info(`Send OTP ${otp} to ${email}`);
  await sendOtpEmail(email, otp);
  return otp;
};

// Verify OTP
const verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError('User not found');
  if (user.otp !== otp) throw new BadRequestError('Invalid OTP');
  if (user.otpExpires < new Date()) throw new BadRequestError('OTP expired');

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return user;
};

// Reset Password
const resetPassword = async ({ email, newPassword }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError('User not found');

  user.password = newPassword;
  await user.save();
  return user;
};

module.exports = {
  register,
  login,
  generateOtp,
  verifyOtp,
  resetPassword,
};
