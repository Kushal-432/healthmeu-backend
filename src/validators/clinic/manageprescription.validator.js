const Joi = require('joi');

exports.managePrescriptionValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  top_margin: Joi.number().required().messages({
    'any.required': 'Top margin is required',
    'number.base': 'Top margin must be a number',
  }),

  left_margin: Joi.number().required().messages({
    'any.required': 'Left margin is required',
    'number.base': 'Left margin must be a number',
  }),

  right_margin: Joi.number().required().messages({
    'any.required': 'Right margin is required',
    'number.base': 'Right margin must be a number',
  }),

  bottom_margin: Joi.number().required().messages({
    'any.required': 'Bottom margin is required',
    'number.base': 'Bottom margin must be a number',
  }),
}).unknown(true);
