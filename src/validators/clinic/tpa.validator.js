const Joi = require('joi');

const tpaValidator = Joi.object({
  clinic_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Clinic ID must be a valid number',
    'number.integer': 'Clinic ID must be an integer',
    'number.positive': 'Clinic ID must be a positive number',
    'any.required': 'Clinic ID is required',
  }),

  name_of_insurer: Joi.string().required().messages({
    'string.base': 'Name of Insurer must be a string',
    'any.required': 'Name of Insurer is required',
  }),

  head_office: Joi.string().required().messages({
    'string.base': 'Head Office must be a string',
    'any.required': 'Head Office is required',
  }),

  gst_no_cin: Joi.string().required().messages({
    'string.base': 'GST No / CIN must be a string',
    'any.required': 'GST No / CIN is required',
  }),

  registration_no: Joi.string().required().messages({
    'string.base': 'Registration No must be a string',
    'any.required': 'Registration No is required',
  }),
}).unknown(true);

module.exports = {
  tpaValidator,
};
