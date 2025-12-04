const Joi = require('joi');

const diseaseValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  disease_name: Joi.string().required().messages({
    'string.base': 'Disease Name must be a string',
    'any.required': 'Disease Name is required',
  }),

  symptoms: Joi.string().required().messages({
    'string.base': 'Symptoms must be a string',
    'any.required': 'Symptoms are required',
  }),
}).unknown(true);

module.exports = {
  diseaseValidator,
};
