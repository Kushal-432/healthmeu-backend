const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required',
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
});

module.exports = { registerSchema, loginSchema };
