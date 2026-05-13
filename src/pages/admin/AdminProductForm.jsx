import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminProductForm.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Home & Garden',
  'Sports & Outdoor',
  'Beauty & Health',
];

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: CATEGORIES[0],
    stock: '',
    isFeatured: false,
    tags: '',
    images: [''],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    document.title = isEdit ? 'Edit Product | Admin' : 'New Product | Admin';
    if (isEdit) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      const data = await res.json();
      if (res.ok && data.product) {
        const p = data.product;
        setForm({
          name: p.name || '',
          price: p.price || '',
          originalPrice: p.originalPrice || '',
          description: p.description || '',
          category: p.category || CATEGORIES[0],
          stock: p.stock || '',
          isFeatured: p.isFeatured || false,
          tags: (p.tags || []).join(', '),
          images: p.images?.length ? p.images : [''],
        });
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      setError('Failed to load product data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    if (form.images.length < 4) {
      setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
    }
  };

  const removeImageField = (index) => {
    if (form.images.length > 1) {
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const validate = () => {
    if (!form.name.trim()) return 'Product name is required';
    if (!form.price || Number(form.price) <= 0) return 'Valid price is required';
    if (!form.description.trim()) return 'Description is required';
    if (!form.stock || Number(form.stock) < 0) return 'Valid stock quantity is required';
    if (!form.images[0]?.trim()) return 'At least one image URL is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      description: form.description.trim(),
      category: form.category,
      stock: Number(form.stock),
      isFeatured: form.isFeatured,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      images: form.images.filter((url) => url.trim()),
    };

    setSubmitting(true);
    try {
      const url = isEdit
        ? `${BASE_URL}/admin/products/${id}`
        : `${BASE_URL}/admin/products`;

      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(isEdit ? 'Product updated successfully!' : 'Product created successfully!');
        setTimeout(() => navigate('/admin/products'), 1000);
      } else {
        setError(data.message || 'Failed to save product');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-product-form">
        <h2 className="admin-page-title">Loading...</h2>
        <div className="form-card">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton" style={{ width: '100%', height: '44px', marginBottom: '16px' }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-product-form">
      <div className="form-header">
        <h2 className="admin-page-title">{isEdit ? 'Edit Product' : 'New Product'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="originalPrice">Original Price ($)</label>
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              step="0.01"
              min="0"
              value={form.originalPrice}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g. camera, professional, studio"
            />
          </div>

          <div className="form-group full-width">
            <label>Image URLs</label>
            {form.images.map((url, index) => (
              <div key={index} className="image-input-row">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                />
                {form.images.length > 1 && (
                  <button type="button" className="remove-image-btn" onClick={() => removeImageField(index)}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            {form.images.length < 4 && (
              <button type="button" className="add-image-btn" onClick={addImageField}>
                <Plus size={14} /> Add Image URL
              </button>
            )}
          </div>

          <div className="form-group full-width checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
              <span>Featured Product</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/admin/products')}>
            <X size={16} /> Cancel
          </button>
          <button type="submit" className="save-btn" disabled={submitting}>
            <Save size={16} /> {submitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
