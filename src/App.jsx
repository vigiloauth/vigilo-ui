import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import FlexContainer from './components/FlexContainer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // Add this
import './index.scss';

const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const RegistrationPage = lazy(
  () => import('./pages/Registration/RegistrationPage')
);
const PasswordResetPage = lazy(
  () => import('./pages/PasswordReset/PasswordResetPage')
);
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <FlexContainer width="100%" height="100vh">
          <Spin size="large" />
        </FlexContainer>
      }
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
