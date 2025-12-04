const Joi = require('joi');

const bedlocationValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  bed_location: Joi.string().required().messages({
    'string.base': 'Bed Location must be a string',
    'any.required': 'Bed Location is required',
  }),

  floor_no: Joi.string().required().messages({
    'string.base': 'Floor Number must be a string',
    'any.required': 'Floor Number is required',
  }),

  wing: Joi.string().required().messages({
    'string.base': 'Wing must be a string',
    'any.required': 'Wing is required',
  }),
}).unknown(true);

module.exports = {
  bedlocationValidator,
};
