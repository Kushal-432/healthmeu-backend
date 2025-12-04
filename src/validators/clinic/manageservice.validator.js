const Joi = require('joi');

const manageserviceValidator = Joi.object({
  clinic_id: Joi.number().integer().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
  }),

  service_name: Joi.string().trim().required().messages({
    'any.required': 'Service name is required',
    'string.base': 'Service name must be a string',
  }),

  price: Joi.number().precision(2).required().messages({
    'any.required': 'Price is required',
    'number.base': 'Price must be a number',
  }),

  gst: Joi.number().precision(2).required().messages({
    'any.required': 'GST is required',
    'number.base': 'GST must be a number',
  }),
}).unknown(true);

module.exports = {
  manageserviceValidator,
};
