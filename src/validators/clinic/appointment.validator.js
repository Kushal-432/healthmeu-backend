const Joi = require('joi');

const appointmentValidator = Joi.object({
  // ❌ clinic_id NOT included (passed from URL)

  appointment_date: Joi.date().required().messages({
    'date.base': 'Appointment Date must be a valid date',
    'any.required': 'Appointment Date is required',
  }),

  mobile_number: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.base': 'Mobile Number must be a string',
      'string.pattern.base': 'Mobile Number must be a valid 10-digit number',
      'any.required': 'Mobile Number is required',
    }),

  patient_name: Joi.string().trim().required().messages({
    'string.base': 'Patient Name must be a string',
    'any.required': 'Patient Name is required',
  }),

  age: Joi.number().integer().min(0).required().messages({
    'number.base': 'Age must be a valid number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age cannot be negative',
    'any.required': 'Age is required',
  }),

  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': 'Gender must be either Male or Female',
    'any.required': 'Gender is required',
  }),

  address: Joi.string().allow('', null).messages({
    'string.base': 'Address must be a string',
  }),

  visit_type: Joi.string().allow('', null).messages({
    'string.base': 'Visit Type must be a string',
  }),

  time_slot: Joi.string().required().messages({
    'string.base': 'Time Slot must be a string',
    'any.required': 'Time Slot is required',
  }),

  health_concern: Joi.string().allow('', null).messages({
    'string.base': 'Health Concern must be a string',
  }),

  referred_by: Joi.string().allow('', null).messages({
    'string.base': 'Referred By must be a string',
  }),

  doctor_id: Joi.number().integer().required().messages({
    'number.base': 'Doctor ID must be a valid number',
    'number.integer': 'Doctor ID must be an integer',
    'any.required': 'Doctor ID is required',
  }),
}).unknown(true);

module.exports = {
  appointmentValidator,
};
