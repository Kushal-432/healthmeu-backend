const Joi = require('joi');

const billheaderValidator = Joi.object({
  clinic_id: Joi.number().integer().required(),
  clinic_name: Joi.string().required().messages({
    'string.empty': 'Clinic/Hospital Name is required',
  }),
  email: Joi.string().email().allow(null, '').messages({
    'string.email': 'Email must be a valid email',
  }),
  gst: Joi.string().allow(null, '').messages({
    'string.base': 'GST must be a string',
  }),
  bill_header_for: Joi.string().valid('Pharmacy', 'Pathomeu', 'Hospital').required().messages({
    'any.only': 'Bill Header For must be Pharmacy, Pathomeu, or Hospital',
    'any.required': 'Bill Header For is required',
  }),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Mobile No is required',
      'string.pattern.base': 'Mobile No must be 10-15 digits',
    }),
  establishment_no: Joi.string().allow(null, '').messages({
    'string.base': 'Establishment No must be a string',
  }),
  address: Joi.string().allow(null, '').messages({
    'string.base': 'Address must be a string',
  }),
  margin_header: Joi.number().precision(2).allow(null).messages({
    'number.base': 'Margin Header must be a number',
  }),
}).unknown(true);

module.exports = { billheaderValidator };
