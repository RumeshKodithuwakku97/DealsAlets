import React, { createContext, useContext, useState, useEffect } from 'react';
import WordPressAuth from '../services/wordpress/auth';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (WordPressAuth.isAuthenticated()) {
      const user = WordPressAuth.getCurrentUser();
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const authData = await WordPressAuth.login(username, password);
      const user = WordPressAuth.getCurrentUser();
      setCurrentUser(user);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    WordPressAuth.logout();
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return !!currentUser;
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;