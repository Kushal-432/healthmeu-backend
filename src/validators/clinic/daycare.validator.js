const Joi = require('joi');

// Validation for a single procedure item
const procedureSchema = Joi.object({
  procedure_name: Joi.string().required().messages({
    'string.empty': 'Procedure name is required',
    'any.required': 'Procedure name is required',
  }),
  qty: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
  price: Joi.number().precision(2).min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be positive',
    'any.required': 'Price is required',
  }),
});

// Validation for main daycare entry
const daycareSchema = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),
  procedure_name: Joi.string().optional(),
  appointment_date: Joi.date().required().messages({
    'date.base': 'Appointment date must be valid',
    'any.required': 'Appointment date is required',
  }),
  full_name: Joi.string().required().messages({
    'string.empty': 'Full name is required',
    'any.required': 'Full name is required',
  }),
  doctor: Joi.string().required().messages({
    'string.empty': 'Doctor name is required',
    'any.required': 'Doctor name is required',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'any.only': 'Gender must be Male, Female, or Other',
    'any.required': 'Gender is required',
  }),
  emergency_contact: Joi.string().required().messages({
    'string.empty': 'Emergency contact is required',
    'any.required': 'Emergency contact is required',
  }),
  next_visit_date: Joi.date().optional(),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be valid',
  }),
  consent_letter: Joi.any().allow(null, ''),
  item_fees: Joi.number().precision(2).min(0).optional(),
  procedure_fees: Joi.number().precision(2).min(0).optional(),
  other_fees: Joi.number().precision(2).min(0).optional(),
  discount: Joi.number().precision(2).min(0).optional(),
  collected_amount: Joi.number().precision(2).min(0).optional(),
  pending_amount: Joi.number().precision(2).min(0).optional(),
  procedures: Joi.array().items(procedureSchema).optional(),
}).unknown(true);

module.exports = { daycareSchema };
