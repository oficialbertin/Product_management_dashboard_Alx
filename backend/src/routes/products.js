const express = require('express');
const pool = require('../db');
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

const parseId = (id) => {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    const err = new Error('Product id must be a positive integer');
    err.status = 400;
    throw err;
  }
  return numericId;
};

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [
      id,
    ]);
    if (!rows.length) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = validate(createProductSchema, req.body);
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, stock, unit, status) VALUES (?, ?, ?, ?, ?, ?)',
      [
        payload.name,
        payload.description ?? '',
        payload.price,
        payload.stock ?? 0,
        payload.unit ?? 'pcs',
        payload.status ?? 'active',
      ]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const payload = validate(updateProductSchema, req.body);

    const fields = Object.keys(payload);
    if (!fields.length) {
      return res.status(400).json({ error: 'No data to update' });
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    const values = [...fields.map((field) => payload[field]), id];

    const [result] = await pool.execute(
      `UPDATE products SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    if (!result.affectedRows) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ?',
      [id]
    );
    if (!result.affectedRows) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

