const Joi = require('joi');

const registerSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required',
  }),
  clinicName: Joi.string().required().messages({
    'string.empty': 'Clinic name is required',
    'any.required': 'Clinic name is required',
  }),

  ownerName: Joi.string().required().messages({
    'string.empty': 'Owner name is required',
    'any.required': 'Owner name is required',
  }),

  mobileNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Mobile number is invalid',
      'any.required': 'Mobile number is required',
    }),

  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Valid email required',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});
const loginSchema = Joi.object({
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
    'any.required': 'Type is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});
const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    'string.base': 'Old password must be a string',
    'string.empty': 'Old password cannot be empty',
    'string.min': 'Old password must be at least 6 characters',
    'any.required': 'Old password is required',
  }),

  newPassword: Joi.string().min(6).required().messages({
    'string.base': 'New password must be a string',
    'string.empty': 'New password cannot be empty',
    'string.min': 'New password must be at least 6 characters',
    'any.required': 'New password is required',
  }),
});

module.exports = { registerSchema, loginSchema, changePasswordSchema };
