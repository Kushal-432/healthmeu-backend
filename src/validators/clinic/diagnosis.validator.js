const Joi = require('joi');

const diagnosisValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  diagnosis_name: Joi.string().required().messages({
    'string.base': 'Diagnosis Name must be a string',
    'any.required': 'Diagnosis Name is required',
  }),

  diagnosis_details: Joi.string().required().messages({
    'string.base': 'Diagnosis Details must be a string',
    'any.required': 'Diagnosis Details are required',
  }),
}).unknown(true);

module.exports = {
  diagnosisValidator,
};
