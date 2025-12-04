const Joi = require('joi');

const bedmanageValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  bed_no: Joi.string().required().messages({
    'string.base': 'Bed Number must be a string',
    'any.required': 'Bed Number is required',
  }),

  daily_rate: Joi.number().required().messages({
    'number.base': 'Daily Rate must be a number',
    'any.required': 'Daily Rate is required',
  }),

  bedtype_id: Joi.number().required().messages({
    'number.base': 'Bed Type ID must be a number',
    'any.required': 'Bed Type ID is required',
  }),

  bedlocation_id: Joi.number().required().messages({
    'number.base': 'Bed Location ID must be a number',
    'any.required': 'Bed Location ID is required',
  }),
}).unknown(true);

module.exports = {
  bedmanageValidator,
};
