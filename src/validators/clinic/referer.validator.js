const Joi = require('joi');

const refererValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  name: Joi.string().required().messages({
    'string.base': 'Referer Name must be a string',
    'any.required': 'Referer Name is required',
  }),
  address: Joi.string().optional().messages({
    'string.base': 'Address must be a string',
  }),
  mobile: Joi.string().optional().messages({
    'string.base': 'Mobile Number must be a string',
  }),
  incentive: Joi.number().optional().messages({
    'number.base': 'Incentive must be a number',
  }),
}).unknown(true);

module.exports = {
  refererValidator,
};
