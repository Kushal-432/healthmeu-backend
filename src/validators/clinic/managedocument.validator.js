const Joi = require('joi');

const managedocumentValidator = Joi.object({
  clinic_id: Joi.number().integer().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
    'number.integer': 'Clinic ID must be an integer',
  }),

  prefix_name: Joi.string().trim().required().messages({
    'any.required': 'Prefix Name is required',
    'string.base': 'Prefix Name must be a string',
  }),

  document_type: Joi.string()
    .valid('IPD Registration', 'Product Bill/Invoice')
    .required()
    .messages({
      'any.only': 'Document Type must be either IPD Registration or Product Bill/Invoice',
      'any.required': 'Document Type is required',
    }),

  prefix_status: Joi.string().valid('Active', 'In-Active').required().messages({
    'any.only': 'Prefix Status must be Active or In-Active',
    'any.required': 'Prefix Status is required',
  }),
}).unknown(true);

module.exports = {
  managedocumentValidator,
};
