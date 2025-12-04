const Joi = require('joi');

const managepatientSearchValidator = Joi.object({
  search: Joi.string().allow('', null),
  from_date: Joi.date().required().messages({
    'any.required': 'From date is required',
  }),
  to_date: Joi.date().required().messages({
    'any.required': 'To date is required',
  }),
  type: Joi.string().valid('OPD', 'Daycare', 'IPD').required().messages({
    'any.only': 'Type must be OPD, Daycare or IPD',
    'any.required': 'Type is required',
  }),
}).unknown(true);

module.exports = { managepatientSearchValidator };
