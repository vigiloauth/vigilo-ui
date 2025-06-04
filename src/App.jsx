import { React, lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Spin } from 'antd';
import FlexContainer from './components/FlexContainer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './index.scss';

const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const RegistrationPage = lazy(
  () => import('./pages/Registration/RegistrationPage')
);
const PasswordResetPage = lazy(
  () => import('./pages/PasswordReset/PasswordResetPage')
);
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));

function AppRoutes() {
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
            <ProtectedRoute requireAdmin>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
