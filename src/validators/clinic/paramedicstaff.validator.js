const Joi = require('joi');

exports.paramedicStaffValidator = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
  }),

  designation: Joi.string().trim().required().messages({
    'string.empty': 'Designation is required',
  }),

  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Mobile number must be 10 digits',
    }),

  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),

  joining_date: Joi.date().required().messages({
    'date.base': 'Joining date must be a valid date',
    'any.required': 'Joining date is required',
  }),

  username: Joi.string().trim().required().messages({
    'string.empty': 'Username is required',
  }),

  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required',
  }),

  // Aadhaar file will not be validated here because it comes through req.file
  // Just skip it

  dob: Joi.date().required().messages({
    'date.base': 'Date of Birth must be a valid date',
    'any.required': 'Date of Birth is required',
  }),

  salary: Joi.number().required().messages({
    'number.base': 'Salary must be a number',
    'any.required': 'Salary is required',
  }),

  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
  }),

  clinic_id: Joi.number().required().messages({
    'any.required': 'Clinic ID is required',
  }),
}).unknown(true);
