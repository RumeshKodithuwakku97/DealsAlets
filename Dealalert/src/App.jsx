// src/App.jsx (Top-level Router)

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import PublicApp from './PublicApp.jsx'; // This file handles your public pages router

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Renders the public site router and catches all public paths */}
          <Route path="/*" element={<PublicApp />} />
          
          {/* Fallback/404 path redirects to the Home page */}
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;