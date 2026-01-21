import type { Product, ProductPayload } from './types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const request = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || response.statusText || 'Request failed';
    throw new Error(message);
  }

  return data as T;
};

export const getProducts = () => request<Product[]>('/products');

export const createProduct = (payload: ProductPayload) =>
  request<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateProduct = (id: string, payload: Partial<ProductPayload>) =>
  request<Product>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteProduct = (id: string) =>
  request<{ message: string }>(`/products/${id}`, { method: 'DELETE' });

