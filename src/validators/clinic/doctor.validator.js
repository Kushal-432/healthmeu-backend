const Joi = require('joi');

const doctorValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  doctor_name: Joi.string().required().messages({
    'string.base': 'Doctor Name must be a string',
    'any.required': 'Doctor Name is required',
  }),

  mobile_no: Joi.string().required().messages({
    'string.base': 'Mobile Number must be a string',
    'any.required': 'Mobile Number is required',
  }),

  alternative_mobile_no: Joi.string().allow('', null).messages({
    'string.base': 'Alternative Mobile Number must be a string',
  }),

  email: Joi.string().email().allow('', null).messages({
    'string.email': 'Email must be a valid email address',
  }),

  address: Joi.string().allow('', null).messages({
    'string.base': 'Address must be a string',
  }),

  licence_no: Joi.string().required().messages({
    'string.base': 'Licence Number must be a string',
    'any.required': 'Licence Number is required',
  }),

  department: Joi.string().required().messages({
    'string.base': 'Department must be a string',
    'any.required': 'Department is required',
  }),

  speciality: Joi.string().allow('', null).messages({
    'string.base': 'Speciality must be a string',
  }),

  qualification: Joi.string().allow('', null).messages({
    'string.base': 'Qualification must be a string',
  }),

  consultation_fees: Joi.number().allow(null).messages({
    'number.base': 'Consultation Fees must be a number',
  }),

  followup_fees: Joi.number().allow(null).messages({
    'number.base': 'Follow Up Fees must be a number',
  }),

  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
}).unknown(true);

module.exports = { doctorValidator };
