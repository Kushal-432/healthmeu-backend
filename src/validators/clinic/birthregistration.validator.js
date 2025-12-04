const Joi = require('joi');

const birthregistrationValidator = Joi.object({
  clinic_id: Joi.number().integer().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
    'number.integer': 'Clinic ID must be an integer',
  }),

  date: Joi.string().required().messages({
    'any.required': 'Date is required',
    'string.base': 'Date must be a string',
  }),

  time: Joi.string().required().messages({
    'any.required': 'Time is required',
    'string.base': 'Time must be a string',
  }),

  baby_name: Joi.string().trim().required().messages({
    'any.required': 'Baby Name is required',
    'string.base': 'Baby Name must be a string',
  }),

  doctor_id: Joi.number().integer().required().messages({
    'any.required': 'Doctor ID is required',
    'number.base': 'Doctor ID must be a number',
    'number.integer': 'Doctor ID must be an integer',
  }),

  age: Joi.required().messages({
    'any.required': 'Age is required',
  }),

  blood_group: Joi.string().required().messages({
    'any.required': 'Blood Group is required',
    'string.base': 'Blood Group must be a string',
  }),

  address: Joi.string().required().messages({
    'any.required': 'Address is required',
    'string.base': 'Address must be a string',
  }),

  sdwo_name: Joi.string().required().messages({
    'any.required': 'S/D/W/O Name is required',
    'string.base': 'S/D/W/O Name must be a string',
  }),

  dob: Joi.string().required().messages({
    'any.required': 'DOB is required',
    'string.base': 'DOB must be a string',
  }),

  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'any.required': 'Mobile is required',
      'string.base': 'Mobile must be a string',
      'string.pattern.base': 'Mobile must be a valid 10-digit number',
    }),

  length_cm: Joi.number().required().messages({
    'any.required': 'Length (cm) is required',
    'number.base': 'Length must be a number',
  }),

  weight_kg: Joi.number().required().messages({
    'any.required': 'Weight (kg) is required',
    'number.base': 'Weight must be a number',
  }),

  head_circum_cm: Joi.number().required().messages({
    'any.required': 'Head Circumference (cm) is required',
    'number.base': 'Head Circumference must be a number',
  }),

  birth_type: Joi.string().valid('Normal', 'Caesarean', 'Forceps').required().messages({
    'any.required': 'Birth Type is required',
    'any.only': 'Birth Type must be Normal, Caesarean or Forceps',
  }),

  btn_register: Joi.string().required().messages({
    'any.required': 'BTN Register is required',
    'string.base': 'BTN Register must be a string',
  }),

  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.required': 'Gender is required',
    'any.only': 'Gender must be Male or Female',
  }),
}).unknown(true);

module.exports = {
  birthregistrationValidator,
};
