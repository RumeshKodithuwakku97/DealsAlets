// src/App.jsx (Renamed to _app.js in the final Next.js structure)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import PublicApp from './PublicApp.js';

function App() {
  // All admin imports, the AdminApp component, and conditional routing are removed.
  // The app now only routes the public interface.
  return (
    <Router>
      <div className="App">
        {/* All public routes are now nested within the PublicApp component */}
        <Routes>
          <Route path="/*" element={<PublicApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;