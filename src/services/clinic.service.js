const db = require('../database/models');
const Clinic = db.Clinic;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const logger = require('../config/log');
const BadRequestError = require('../utils/error/BadRequestError');

/**
 * Register a new clinic
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const getModelByType = (type) => {
  switch (type?.toLowerCase()) {
    case 'clinic':
      return Clinic;

    // case 'pharmacy': return Pharmacy;
    // case 'pathomeu': return Pathomeu;

    default:
      throw new BadRequestError('Invalid type provided');
  }
};

// -------------------------------------------------------
// REGISTER
// -------------------------------------------------------

const registerClinic = async (data) => {
  const Model = getModelByType(data.type);

  // Check duplicate email OR mobile
  const existing = await Model.findOne({
    where: {
      [Op.or]: [{ email: data.email }, { mobileNo: data.mobileNo }],
    },
  });

  if (existing) throw new BadRequestError('Email or Mobile already exists');

  // -------- Generate Unique ID based on clinicName ----------
  const namePrefix = data.clinicName
    .substring(0, 4)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

  const randomString = crypto.randomBytes(7).toString('hex');

  data.clinic_id = `${namePrefix}${randomString}`;
  // -----------------------------------------------------------

  const created = await Model.create(data);

  return created;
};

// -------------------------------------------------------
// LOGIN
// -------------------------------------------------------
const loginClinic = async ({ email, password, type }) => {
  const Model = getModelByType(type);

  if (!email || !password) throw new BadRequestError('Email and Password are required');

  const user = await Model.scope('withPassword').findOne({ where: { email } });

  if (!user) throw new BadRequestError('Invalid credentials');

  const valid = await user.comparePassword(password);
  if (!valid) throw new BadRequestError('Invalid credentials');

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  const userData = user.toJSON();
  delete userData.password;

  return { user: userData, token };
};

const changePassword = async (req, oldPassword, newPassword) => {
  const clinicId = req.user?.id;

  if (!clinicId) throw new BadRequestError('Unauthorized request');

  const clinic = await Clinic.scope('withPassword').findByPk(clinicId);
  if (!clinic) throw new BadRequestError('Clinic not found');

  const match = await clinic.comparePassword(oldPassword);
  if (!match) throw new BadRequestError('Old password is incorrect');

  // ✅ Model hook will hash automatically
  clinic.password = newPassword;
  await clinic.save();

  return {
    id: clinic.id,
    clinicName: clinic.clinicName,
    email: clinic.email,
    msg: 'Password updated successfully',
  };
};
const getProfile = async (clinicId) => {
  const clinic = await Clinic.findByPk(clinicId, {
    attributes: { exclude: ['password'] }, // ✅ Do not expose password
  });

  if (!clinic) throw new BadRequestError('Clinic not found');

  return clinic;
};
module.exports = {
  registerClinic,
  loginClinic,
  changePassword,
  getProfile,
};

/**
 * Find Clinic by Email for Login
 * @param {String} email
 */
exports.findClinicByEmail = async (email) => {
  return await Clinic.findOne({ where: { email } });
};

/**
 * Get Clinic by ID
 * @param {Number} id
 */
exports.getClinicById = async (id) => {
  return await Clinic.findByPk(id);
};
