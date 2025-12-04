const Joi = require('joi');

const surgerytypeValidator = Joi.object({
  clinic_id: Joi.number().integer().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
    'number.integer': 'Clinic ID must be an integer',
  }),

  surgery_name: Joi.string().trim().required().messages({
    'any.required': 'Surgery name is required',
    'string.base': 'Surgery name must be a string',
  }),

  category: Joi.string().trim().required().messages({
    'any.required': 'Category is required',
    'string.base': 'Category must be a string',
  }),

  price: Joi.number().precision(2).required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
    'number.precision': 'Price can have up to 2 decimal places',
  }),
}).unknown(true);

module.exports = {
  surgerytypeValidator,
};
