const Joi = require('joi');

const medicineValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  medicine_name: Joi.string().required().messages({
    'string.base': 'Medicine Name must be a string',
    'any.required': 'Medicine Name is required',
  }),
}).unknown(true);

module.exports = {
  medicineValidator,
};
