// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// CRITICAL: AuthProvider is removed for security and stability
import { DealProvider } from './context/DealContext.js'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Only the DealProvider remains to manage global content state */}
    <DealProvider>
      <App />
    </DealProvider>
  </React.StrictMode>,
);