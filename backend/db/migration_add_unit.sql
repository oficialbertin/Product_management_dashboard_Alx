-- Migration script to add 'unit' column to existing products table
-- Run this if you already have the products table without the unit field

USE product_dashboard;

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS unit VARCHAR(20) NOT NULL DEFAULT 'pcs' AFTER stock;

