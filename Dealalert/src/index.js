// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// FIX: Import the Context Providers
import { AuthProvider } from './context/AuthContext'; 
import { DealProvider } from './context/DealContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

// CRITICAL FIX: The complete and valid root.render() call is needed here.
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DealProvider>
        <App />
      </DealProvider>
    </AuthProvider>
  </React.StrictMode>
);