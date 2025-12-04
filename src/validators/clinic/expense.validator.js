const Joi = require('joi');

const expenseSchema = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  date: Joi.date().required().messages({
    'any.required': 'Date is required',
    'date.base': 'Date must be a valid date',
  }),

  purchase_item: Joi.string().trim().required().messages({
    'any.required': 'Purchase item is required',
    'string.empty': 'Purchase item cannot be empty',
  }),

  price: Joi.number().precision(2).required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a valid number',
  }),
}).unknown(true);

module.exports = { expenseSchema };
