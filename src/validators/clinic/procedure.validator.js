const Joi = require('joi');

const procedureValidator = Joi.object({
  clinic_id: Joi.number().integer().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
  }),
  procedure_name: Joi.string().required().messages({
    'any.required': 'Procedure Name is required',
    'string.base': 'Procedure Name must be a string',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
  }),
  gst: Joi.number().optional().messages({
    'number.base': 'GST must be a number',
  }),
}).unknown(true);

module.exports = { procedureValidator };
