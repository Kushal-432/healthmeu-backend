const Joi = require('joi');

const bedtypeValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  bed_type_name: Joi.string().required().messages({
    'string.base': 'Bed Type Name must be a string',
    'any.required': 'Bed Type Name is required',
  }),

  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is required',
  }),

  base_price: Joi.number().required().messages({
    'number.base': 'Base Price must be a number',
    'any.required': 'Base Price is required',
  }),
}).unknown(true);

module.exports = {
  bedtypeValidator,
};
