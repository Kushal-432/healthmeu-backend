const Joi = require('joi');

const staffValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),

  mobile_no: Joi.string().required().messages({
    'string.base': 'Mobile Number must be a string',
    'any.required': 'Mobile Number is required',
  }),

  joining_date: Joi.date().required().messages({
    'date.base': 'Joining Date must be a valid date',
    'any.required': 'Joining Date is required',
  }),

  dob: Joi.date().optional().messages({
    'date.base': 'Date of Birth must be a valid date',
  }),

  designation: Joi.string().optional().messages({
    'string.base': 'Designation must be a string',
  }),

  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be valid',
  }),

  username: Joi.string().required().messages({
    'string.base': 'Username must be a string',
    'any.required': 'Username is required',
  }),

  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),

  salary: Joi.number().optional().messages({
    'number.base': 'Salary must be a number',
  }),

  address: Joi.string().optional().messages({
    'string.base': 'Address must be a string',
  }),
}).unknown(true);

module.exports = {
  staffValidator,
};
