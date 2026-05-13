import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminProducts.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Products | Admin Panel';
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/products?page=${page}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2 className="admin-page-title">Products</h2>
        <Link to="/admin/products/new" className="add-product-btn">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="products-table-card">
        {loading ? (
          <div className="table-loading">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton-row">
                <div className="skeleton" style={{ width: '50px', height: '50px', borderRadius: '6px' }}></div>
                <div className="skeleton" style={{ width: '200px', height: '16px' }}></div>
                <div className="skeleton" style={{ width: '80px', height: '16px' }}></div>
                <div className="skeleton" style={{ width: '60px', height: '16px' }}></div>
                <div className="skeleton" style={{ width: '40px', height: '16px' }}></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="admin-table products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={product.images?.[0] || ''}
                          alt={product.name}
                          className="product-thumb"
                        />
                      </td>
                      <td className="product-name-cell">{product.name}</td>
                      <td><span className="category-badge">{product.category}</span></td>
                      <td className="price-cell">${product.price.toFixed(2)}</td>
                      <td>
                        <span className={`stock-badge ${product.stock < 5 ? 'low' : ''}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td>
                        {product.isFeatured && <Star size={16} fill="#FF9017" color="#FF9017" />}
                      </td>
                      <td>
                        <div className="action-btns">
                          <button
                            className="edit-btn"
                            onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => setDeleteConfirm(product._id)}
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="table-pagination">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="page-btn"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="page-btn"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h4>Delete Product?</h4>
            <p>This action cannot be undone. Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="modal-delete" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
