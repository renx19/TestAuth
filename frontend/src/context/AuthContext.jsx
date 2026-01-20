// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/handleError';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // track fetch status

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile(); // use centralized API
        setUser(data);
      } catch (err) {
        console.warn('User not authenticated:', getErrorMessage(err));
        setUser(null); // unauthenticated
      } finally {
        setLoading(false); // done fetching
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
