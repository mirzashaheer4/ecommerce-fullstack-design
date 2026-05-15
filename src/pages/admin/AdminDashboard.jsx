import React, { useState, useEffect } from 'react';
import { Package, Users, AlertTriangle, Star, BarChart3, ShoppingBag, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard | Admin Panel';
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h2 className="admin-page-title">Dashboard</h2>
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card skeleton-card">
              <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '8px' }}></div>
              <div>
                <div className="skeleton" style={{ width: '60px', height: '24px', marginBottom: '6px' }}></div>
                <div className="skeleton" style={{ width: '100px', height: '14px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Revenue', value: `$${(stats?.totalRevenue || 0).toFixed(2)}`, icon: DollarSign, color: '#0D6EFD' },
    { label: 'Total Orders', value: stats?.totalOrders || 0, icon: ShoppingBag, color: '#00B517' },
    { label: 'Total Products', value: stats?.totalProducts || 0, icon: Package, color: '#FF9017' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: '#8A2BE2' },
    { label: 'Low Stock', value: stats?.lowStockProducts || 0, icon: AlertTriangle, color: '#FA3434' },
    { label: 'Featured', value: stats?.featuredProductCount || 0, icon: Star, color: '#F6B100' },
  ];

  return (
    <div className="admin-dashboard page-animate">
      <h2 className="admin-page-title">Dashboard</h2>

      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${card.color}15` }}>
              <card.icon size={22} color={card.color} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{card.value}</span>
              <span className="stat-label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      {stats?.categoryBreakdown && (
        <div className="dashboard-section">
          <h3 className="section-title">
            <BarChart3 size={18} />
            Category Breakdown
          </h3>
          <div className="category-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Products</th>
                  <th>Distribution</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.categoryBreakdown).map(([category, count]) => {
                  const percentage = ((count / stats.totalProducts) * 100).toFixed(0);
                  return (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>{count}</td>
                      <td>
                        <div className="bar-container">
                          <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                          <span className="bar-label">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className="dashboard-section" style={{ marginTop: '30px' }}>
          <h3 className="section-title">
            <ShoppingBag size={18} />
            Recent Orders
          </h3>
          <div className="category-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.user ? order.user.name : order.deliveryInfo?.fullName}</td>
                    <td>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
