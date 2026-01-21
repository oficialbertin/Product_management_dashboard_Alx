import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { createProduct, deleteProduct, getProducts, updateProduct } from './api';
import type { Product, ProductPayload, ProductStatus, StockUnit } from './types';

type FormState = {
  name: string;
  description: string;
  price: string;
  stock: string;
  unit: StockUnit;
  status: ProductStatus;
};

const emptyForm: FormState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  unit: 'pcs',
  status: 'active',
};

const currency = (value: number) =>
  new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF', minimumFractionDigits: 0 }).format(
    value
  );

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(
    () => ({
      count: products.length,
      stock: products.reduce((sum, item) => sum + (item.stock || 0), 0),
      value: products.reduce((sum, item) => sum + item.price * item.stock, 0),
    }),
    [products]
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const updateField = (
    field: keyof FormState,
    value: string | ProductStatus | StockUnit
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
  };

  const buildPayload = (): ProductPayload | null => {
    const trimmedName = form.name.trim();
    const price = Number(form.price);
    const stock = Number(form.stock || 0);

    if (!trimmedName || Number.isNaN(price) || price <= 0) {
      setError('Name and a positive price are required');
      return null;
    }

    if (stock < 0) {
      setError('Stock cannot be negative');
      return null;
    }

    return {
      name: trimmedName,
      description: form.description.trim(),
      price,
      stock,
      unit: form.unit,
      status: form.status,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = buildPayload();
    if (!payload) return;

    try {
      setSubmitting(true);
      setError(null);
      if (editingId) {
        const updated = await updateProduct(editingId, payload);
        setProducts((prev) =>
          prev.map((item) => (item.id === editingId ? updated : item))
        );
      } else {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to save product right now'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit || 'pcs',
      status: product.status as ProductStatus,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this product?');
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Product Dashboard</p>
          <h1>Manage your catalog</h1>
          <p className="muted">
            Add, edit, and remove products. All fields are validated before
            saving.
          </p>
        </div>
        <div className="stats">
          <div className="stat">
            <p className="label">Products</p>
            <p className="value">{totals.count}</p>
          </div>
          <div className="stat">
            <p className="label">Total Stock</p>
            <p className="value">{totals.stock}</p>
          </div>
          <div className="stat">
            <p className="label">Inventory Value</p>
            <p className="value">{currency(totals.value || 0)}</p>
          </div>
        </div>
      </header>

      <div className="layout">
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Product Form</p>
              <h2>{editingId ? 'Update product' : 'Create product'}</h2>
            </div>
            {editingId && (
              <button className="ghost" type="button" onClick={resetForm}>
                Cancel edit
              </button>
            )}
          </div>

          {error && <div className="alert">{error}</div>}

          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name *</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Product name"
                required
              />
            </label>
            <label className="field">
              <span>Description</span>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Optional details"
                rows={3}
              />
            </label>
            <div className="field-row">
              <label className="field">
                <span>Price (RWF) *</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => updateField('price', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </label>
              <label className="field">
                <span>Stock</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => updateField('stock', e.target.value)}
                  placeholder="0"
                />
              </label>
              <label className="field">
                <span>Unit</span>
                <select
                  value={form.unit}
                  onChange={(e) => updateField('unit', e.target.value as StockUnit)}
                >
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="kgs">Kilograms (kgs)</option>
                  <option value="liters">Liters</option>
                  <option value="grams">Grams</option>
                  <option value="boxes">Boxes</option>
                  <option value="bags">Bags</option>
                  <option value="bottles">Bottles</option>
                </select>
              </label>
            </div>
            <label className="field">
              <span>Status</span>
              <select
                value={form.status}
                onChange={(e) => updateField('status', e.target.value as ProductStatus)}
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <div className="actions">
              <button type="submit" disabled={submitting}>
                {submitting
                  ? 'Saving...'
                  : editingId
                    ? 'Update product'
                    : 'Create product'}
              </button>
              <button
                className="ghost"
                type="button"
                onClick={resetForm}
                disabled={submitting}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Inventory</p>
              <h2>Products list</h2>
            </div>
            <button type="button" className="ghost" onClick={loadProducts}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="muted">Loading products...</p>
          ) : !products.length ? (
            <p className="muted">No products yet. Add one to get started.</p>
          ) : (
            <div className="table">
              <div className="table-head">
                <span>Name</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {products.map((product) => (
                <div className="table-row" key={product.id}>
                  <div>
                    <p className="title">{product.name}</p>
                    <p className="muted small">
                      {product.description || 'No description'}
                    </p>
                  </div>
                  <span>{currency(product.price)}</span>
                  <span>{product.stock} {product.unit || 'pcs'}</span>
                  <span className={`pill ${product.status}`}>
                    {product.status}
                  </span>
                  <div className="row-actions">
                    <button
                      className="ghost"
                      type="button"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="danger"
                      type="button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;

