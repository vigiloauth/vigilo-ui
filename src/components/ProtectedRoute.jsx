import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';
import FlexContainer from './FlexContainer';

function ProtectedRoute({ children, requireAdmin }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <FlexContainer width="100%" height="100vh">
        <Spin size="large" />
      </FlexContainer>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  requireAdmin: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  children: null,
  requireAdmin: false,
};

export default ProtectedRoute;
