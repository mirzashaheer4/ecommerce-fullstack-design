import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS_PROGRESSION = {
  'pending': ['processing', 'cancelled'],
  'processing': ['shipped', 'cancelled'],
  'shipped': ['delivered'],
  'delivered': [],
  'failed': [],
  'cancelled': []
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  
  const { token } = useAuth();
  const { formatPrice } = useSettings();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/admin/orders?limit=50`;
      if (statusFilter) {
        url += `&status=${statusFilter}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Orders | Admin Panel';
    fetchOrders();
  }, [statusFilter, token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Optimistic update
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="admin-page page-animate">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="admin-page-title">Orders Management</h2>
        
        <select 
          className="admin-input" 
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
          style={{ width: '200px' }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="admin-table-card">
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            <ShoppingBag size={48} style={{ marginBottom: '10px', opacity: 0.5 }} />
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const allowedNextStatuses = STATUS_PROGRESSION[order.status] || [];
                  const isSelectDisabled = allowedNextStatuses.length === 0;

                  return (
                    <tr key={order._id}>
                      <td><strong>{order.orderNumber}</strong></td>
                      <td>
                        <div>{order.user ? order.user.name : order.deliveryInfo?.fullName}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {order.user ? order.user.email : order.deliveryInfo?.email}
                        </div>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{formatPrice(order.total)}</td>
                      <td>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          disabled={isSelectDisabled}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            background: isSelectDisabled ? '#f3f4f6' : '#fff',
                            cursor: isSelectDisabled ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <option value={order.status}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</option>
                          {allowedNextStatuses.map(status => (
                            <option key={status} value={status}>
                              Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
