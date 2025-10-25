// src/App.jsx

import React from 'react';
// FIX: Import Navigate (and Home)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import AdminApp from './AdminApp';
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* FIX: The root path renders the Home component (which uses the context) */}
          <Route path="/" element={<Home />} />
          
          {/* Admin routes are nested */}
          <Route path="/admin/*" element={<AdminApp />} />
          
          {/* Fallback/404 path redirects to the Home page */}
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;