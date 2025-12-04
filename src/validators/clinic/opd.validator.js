const Joi = require('joi');

const opdSchema = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),

  // Patient Identity
  profile_img: Joi.any().allow(null, ''),
  uhid: Joi.string().allow(null, ''),
  abha_number: Joi.string().allow(null, ''),
  abha_address: Joi.string().allow(null, ''),

  // Contact Details
  mobile_number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Mobile number is required',
      'string.pattern.base': 'Mobile number must be 10 digits',
      'any.required': 'Mobile number is required',
    }),
  email: Joi.string().email().allow(null, '').messages({
    'string.email': 'Enter a valid email address',
  }),

  // History & Visit
  view_history: Joi.boolean().default(false),
  arrival_time: Joi.string().allow(null, ''),

  // Registration
  panel_tpa: Joi.string().allow(null, ''),
  card_no: Joi.string().allow(null, ''),
  rank: Joi.string().allow(null, ''),
  revisiting_patient: Joi.string().default(false),

  // Personal Info
  dob: Joi.date().allow(null),
  appointment_date: Joi.date().required().messages({
    'date.base': 'Appointment date must be a valid date',
    'any.required': 'Appointment date is required',
  }),
  doctor_id: Joi.number().integer().required().messages({
    'any.required': 'Doctor is required',
    'number.base': 'Doctor must be a valid number',
    'number.integer': 'Doctor must be an integer',
  }),

  department: Joi.string().allow(null, ''),
  patient_name: Joi.string().required().messages({
    'string.empty': 'Patient name is required',
  }),
  guardian_name: Joi.string().allow(null, ''),
  relation: Joi.string().allow(null, ''),
  age: Joi.number().integer().allow(null),
  gender: Joi.string().valid('Male', 'Female', 'Other').allow(null, ''),

  speciality: Joi.string().allow(null, ''),
  account_holder_name: Joi.string().allow(null, ''),
  health_concern: Joi.string().allow(null, ''),

  appointment_type: Joi.string().allow(null, ''),
  lead_type: Joi.string().allow(null, ''),
  time_slot: Joi.string().allow(null, ''),
  referred_by: Joi.string().allow(null, ''),
  address: Joi.string().allow(null, ''),
  remark: Joi.string().allow(null, ''),

  // Billing
  consultation_fees: Joi.number().default(0),
  registration_fees: Joi.number().default(0),
  discount: Joi.number().default(0),
  collected_amount: Joi.number().default(0),
  pending_amount: Joi.number().default(0),
  payment_mode: Joi.string().allow(null, ''),
}).unknown(true);

module.exports = { opdSchema };
