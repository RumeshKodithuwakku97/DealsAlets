// src/AdminApp.js

import React from 'react';
// FIX: Only import components needed for routing inside this nested app
import { Routes, Route, Navigate } from 'react-router-dom'; 
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import DealManagement from './components/admin/DealManagement';
import SubscriberManagement from './components/admin/SubscriberManagement';
import './AdminApp.css';

function AdminApp() {
  // FIX: Removed redundant <AuthProvider> and <Router> wrappers
  return (
    <div className="admin-app">
      <Routes>
        {/* Routes use relative paths (no leading '/') */}
        <Route path="login" element={<AdminLogin />} />
        
        <Route path="dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        {/* ... other protected routes ... */}
        
        {/* Default route (e.g., /admin) redirects to dashboard */}
        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default AdminApp;