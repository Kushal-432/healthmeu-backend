const Joi = require('joi');

const departmentValidator = Joi.object({
  clinic_id: Joi.number().required().messages({
    'any.required': 'Clinic ID is required',
    'number.base': 'Clinic ID must be a number',
  }),
  department_name: Joi.string().required().messages({
    'any.required': 'Department Name is required',
    'string.base': 'Department Name must be a string',
  }),
}).unknown(true);

module.exports = { departmentValidator };
