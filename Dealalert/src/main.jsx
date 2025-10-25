// src/main.jsx
// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// FIX: Ensure all providers are imported correctly
import { AuthProvider } from './context/AuthContext.js';
import { DealProvider } from './context/DealContext.js'; 
import './index.css'; 

// ... (The provided code should be correct)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider wraps the app to provide login status for admin links */}
    <AuthProvider>
      {/* DealProvider wraps the app to provide deal data and language state */}
      <DealProvider>
        <App />
      </DealProvider>
    </AuthProvider>
  </React.StrictMode>,
);