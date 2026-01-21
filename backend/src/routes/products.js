const express = require('express');
const Product = require('../models/Product');
const {
  createProductSchema,
  updateProductSchema,
} = require('../validation/productValidation');

const router = express.Router();

const validate = (schema, payload) => {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const err = new Error(error.details.map((d) => d.message).join(', '));
    err.status = 400;
    throw err;
  }
  return value;
};

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = validate(createProductSchema, req.body);
    const product = new Product({
      name: payload.name,
      description: payload.description ?? '',
      price: payload.price,
      stock: payload.stock ?? 0,
      unit: payload.unit ?? 'pcs',
      status: payload.status ?? 'active',
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = validate(updateProductSchema, req.body);

    const fields = Object.keys(payload);
    if (!fields.length) {
      return res.status(400).json({ error: 'No data to update' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...payload, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    next(err);
  }
});

module.exports = router;

