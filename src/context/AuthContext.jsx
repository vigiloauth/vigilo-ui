import { React, createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const USER_DATA = 'userData';
  const ACCESS_TOKEN = 'access_token';
  const REFRESH_TOKEN = 'refresh_token';

  useEffect(() => {
    const checkAuth = () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const userData = localStorage.getItem(USER_DATA);

        if (accessToken && refreshToken && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(USER_DATA);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(USER_DATA, JSON.stringify(userData));
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_DATA);
    navigate('/');
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: hasRole('ADMIN'),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
