// src/PublicApp.jsx (REMAINS THE SAME)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Newsletter from './pages/Newsletter.js';

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