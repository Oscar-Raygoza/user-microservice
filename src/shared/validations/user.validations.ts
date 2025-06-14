import Joi from 'joi';

const rfcRegex = /^([A-ZÑ&]{3,4})\d{6}[A-Z0-9]{3}$/;

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  lastname: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
    'string.max': 'Last name cannot exceed 100 characters',
  }),
  email: Joi.string().email().allow(null, '').messages({
    'string.email': 'Please provide a valid email address',
  }),
  rfc: Joi.string().pattern(rfcRegex).required().messages({
    'string.empty': 'RFC is required',
    'string.pattern.base': 'RFC format is invalid',
  }),
  zip_code: Joi.string().length(5).pattern(/^\d+$/).required().messages({
    'string.empty': 'Zip code is required',
    'string.length': 'Zip code must be exactly 5 digits',
    'string.pattern.base': 'Zip code must contain only numbers',
  }),
});


export const updateUserSchema = createUserSchema
  .fork(['name', 'lastname', 'rfc', 'zip_code', 'email'], (schema) => schema.optional())
  .append({
    id: Joi.forbidden().messages({
      'any.unknown': 'You are not allowed to update the id',
    }),
  });