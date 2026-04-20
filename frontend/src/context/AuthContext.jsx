import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on load
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username, token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const data = response.data; // Note: The backend returns a plain string currently
      
      if (data && data !== 'Invalid username or password!') {
        // Assume data is the JWT token
        localStorage.setItem('token', data);
        localStorage.setItem('username', username);
        setUser({ username, token: data });
        return { success: true };
      } else {
        return { success: false, message: 'Invalid username or password!' };
      }
    } catch (error) {
      return { success: false, message: 'Login failed due to server error.' };
    }
  };

  const register = async (username, password) => {
    try {
      const response = await api.post('/auth/register', { username, password });
      const data = response.data;
      if (data === 'User registered successfully!') {
        return { success: true };
      } else {
        return { success: false, message: data }; // E.g., 'Username is already taken!'
      }
    } catch (error) {
      return { success: false, message: 'Registration failed due to server error.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
