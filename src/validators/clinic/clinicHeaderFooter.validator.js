const Joi = require('joi');

const clinicHeaderFooterValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  header_image: Joi.any().required(),

  header_margin: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'Header Margin must be a number',
    'number.min': 'Header Margin cannot be negative',
    'any.required': 'Header Margin is required',
  }),
  footer_image: Joi.any().required(),

  footer_margin: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'Footer Margin must be a number',
    'number.min': 'Footer Margin cannot be negative',
    'any.required': 'Footer Margin is required',
  }),
  doctor_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Doctor ID must be a number',
    'number.integer': 'Doctor ID must be an integer',
    'number.positive': 'Doctor ID must be a positive number',
    'any.required': 'Doctor ID is required',
  }),
  top_margin: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'Top Margin must be a number',
    'number.min': 'Top Margin cannot be negative',
    'any.required': 'Top Margin is required',
  }),
  bottom_margin: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'Bottom Margin must be a number',
    'number.min': 'Bottom Margin cannot be negative',
    'any.required': 'Bottom Margin is required',
  }),
}).unknown(true);

module.exports = {
  clinicHeaderFooterValidator,
};
