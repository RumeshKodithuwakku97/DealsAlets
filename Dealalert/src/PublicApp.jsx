// src/PublicApp.jsx (NEW FILE)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Newsletter from './pages/Newsletter';

function PublicApp() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/newsletter" element={<Newsletter />} />
      
      {/* Catch-all for unknown public paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default PublicApp;