import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FlexContainer from './FlexContainer';
import { Spin } from 'antd';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
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
};

export default ProtectedRoute;
