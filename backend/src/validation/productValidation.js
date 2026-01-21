const Joi = require('joi');

const baseSchema = {
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow('').max(255).default(''),
  price: Joi.number().precision(2).positive(),
  stock: Joi.number().integer().min(0).default(0),
  unit: Joi.string().valid('pcs', 'kgs', 'liters', 'grams', 'boxes', 'bags', 'bottles').default('pcs'),
  status: Joi.string().valid('active', 'archived').default('active'),
};

const createProductSchema = Joi.object({
  ...baseSchema,
  name: baseSchema.name.required(),
  price: baseSchema.price.required(),
}).options({ stripUnknown: true });

const updateProductSchema = Joi.object(baseSchema)
  .min(1)
  .options({ stripUnknown: true });

module.exports = { createProductSchema, updateProductSchema };

