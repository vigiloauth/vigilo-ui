import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import PropTypes from 'prop-types';
import App from '../App';

vi.mock('../components/FlexContainer', () => ({
  default: ({ children }) => <div data-testid="flex-container">{children}</div>,
}));

vi.mock('antd', () => {
  function Spin({ className, style, children }) {
    return (
      <div data-testid="spin" className={className} style={style}>
        {children}
      </div>
    );
  }
  Spin.propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    children: PropTypes.node,
  };
  Spin.defaultProps = {
    className: '',
    style: {},
    children: null,
  };
  return { Spin };
});

vi.mock('../components/ProtectedRoute', () => ({
  default: ({ children }) => (
    <div data-testid="protected-route">{children}</div>
  ),
}));

vi.mock('../context/AuthContext', () => {
  function AuthProvider({ children }) {
    return <div data-testid="auth-provider">{children}</div>;
  }
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return { AuthProvider };
});

vi.mock('../pages/Login/LoginPage', () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock('../pages/Registration/RegistrationPage', () => ({
  default: () => <div>Registration Page</div>,
}));

vi.mock('../pages/PasswordReset/PasswordResetPage', () => ({
  default: () => <div>Password Reset Page</div>,
}));

vi.mock('../pages/Dashboard/DashboardPage', () => ({
  default: () => <div>Dashboard Page</div>,
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders LoginPage at root path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('renders RegistrationPage at /signup', async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Registration Page')).toBeInTheDocument();
    });
  });

  it('renders PasswordResetPage at /reset-password', async () => {
    render(
      <MemoryRouter initialEntries={['/reset-password']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Password Reset Page')).toBeInTheDocument();
    });
  });

  it('renders DashboardPage at /dashboard inside ProtectedRoute', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId('protected-route')).toBeInTheDocument();
      expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    });
  });
});
