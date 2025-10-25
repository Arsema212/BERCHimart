import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        // For hardcoded auth, just parse the stored user data
        const user = JSON.parse(userData);
        setUser(user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      // Store token and user data
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('userData', JSON.stringify(result.data.user));
      setUser(result.data.user);

      // Trigger auth change for header update
      window.dispatchEvent(new Event('authChange'));

      return { success: true, user: result.data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      // Hardcoded test credentials
      const testUsers = {
        'admin@gmail.com': {
          password: 'admin1234',
          user: {
            _id: 'admin-1',
            name: 'System Administrator',
            email: 'admin@gmail.com',
            role: 'admin',
            status: 'approved',
            profile: {
              avatar: '',
              bio: 'Platform Administrator'
            }
          }
        },
        'moderator@gmail.com': {
          password: 'moderator1234',
          user: {
            _id: 'moderator-1',
            name: 'Content Moderator',
            email: 'moderator@gmail.com',
            role: 'moderator',
            status: 'approved',
            profile: {
              avatar: '',
              bio: 'Content Moderator'
            }
          }
        },
        'seller@gmail.com': {
          password: 'seller1234',
          user: {
            _id: 'seller-1',
            name: 'Handmade Artisan',
            email: 'seller@gmail.com',
            role: 'artisan',
            status: 'approved',
            profile: {
              avatar: '',
              bio: 'Handmade Crafts Artisan'
            }
          }
        },
        'customer@gmail.com': {
          password: 'customer1234',
          user: {
            _id: 'customer-1',
            name: 'Happy Customer',
            email: 'customer@gmail.com',
            role: 'user',
            status: 'approved',
            profile: {
              avatar: '',
              bio: 'Happy Customer'
            }
          }
        }
      };

      if (testUsers[email] && testUsers[email].password === password) {
        // Store token and user data
        localStorage.setItem('authToken', 'demo-jwt-token');
        localStorage.setItem('userData', JSON.stringify(testUsers[email].user));
        localStorage.setItem('userRole', testUsers[email].user.role);
        setUser(testUsers[email].user);

        // Trigger auth change for header update
        window.dispatchEvent(new Event('authChange'));

        return { success: true, user: testUsers[email].user };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};