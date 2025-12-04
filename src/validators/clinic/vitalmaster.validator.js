const Joi = require('joi');

const vitalmasterValidator = Joi.object({
  clinic_id: Joi.number().integer().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
    'number.integer': 'Clinic ID must be an integer',
  }),

  parameter_name: Joi.string().trim().required().messages({
    'any.required': 'Parameter Name is required',
    'string.base': 'Parameter Name must be a string',
  }),

  parameter_unit: Joi.string().trim().required().messages({
    'any.required': 'Parameter Unit is required',
    'string.base': 'Parameter Unit must be a string',
  }),

  parameter_status: Joi.string().valid('Active', 'In-Active').required().messages({
    'any.only': 'Parameter Status must be either Active or In-Active',
    'any.required': 'Parameter Status is required',
  }),
}).unknown(true);

module.exports = {
  vitalmasterValidator,
};
