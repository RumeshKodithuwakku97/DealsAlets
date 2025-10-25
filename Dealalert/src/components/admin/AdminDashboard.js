import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDeals } from '../../services/wordpress/deals';
import { getSubscribers } from '../../services/wordpress/subscribers';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [stats, setStats] = useState({
    totalDeals: 0,
    totalSubscribers: 0,
    activeDeals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [deals, subscribers] = await Promise.all([
        getDeals(),
        getSubscribers()
      ]);
      
      setStats({
        totalDeals: deals.length,
        totalSubscribers: subscribers.length,
        activeDeals: deals.filter(deal => deal.status === 'publish').length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {currentUser?.displayName}</span>
            <button onClick={logout} className="btn btn-primary">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Deals</h3>
            <p className="stat-number">{stats.totalDeals}</p>
          </div>
          <div className="stat-card">
            <h3>Active Deals</h3>
            <p className="stat-number">{stats.activeDeals}</p>
          </div>
          <div className="stat-card">
            <h3>Subscribers</h3>
            <p className="stat-number">{stats.totalSubscribers}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <a href="/admin/deals" className="action-card">
            <h3>Manage Deals</h3>
            <p>Create, edit, and delete deals</p>
          </a>
          <a href="/admin/subscribers" className="action-card">
            <h3>Subscribers</h3>
            <p>Manage newsletter subscribers</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;