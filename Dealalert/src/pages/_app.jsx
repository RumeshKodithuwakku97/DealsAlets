// src/pages/_app.jsx

import React from 'react';
import { DealProvider } from '../context/DealContext';
// CRITICAL: Import your global styles here (and ONLY here)
import '../index.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <DealProvider>
      {/* Component is the page currently being viewed (Home, About, etc.) */}
      <Component {...pageProps} /> 
    </DealProvider>
  );
}

export default MyApp;