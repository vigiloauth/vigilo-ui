import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, afterEach, it, expect } from 'vitest';
import PropTypes from 'prop-types';
import '@testing-library/jest-dom';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

vi.mock('react-router-dom', () => {
  function Navigate({ to }) {
    return <div>Navigate to {to}</div>;
  }
  Navigate.propTypes = {
    to: PropTypes.string.isRequired,
  };
  return { Navigate };
});

vi.mock('antd', () => ({
  Spin: () => <div>Loading Spinner</div>,
}));

vi.mock('../../components/FlexContainer', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="flex-container">{children}</div>,
}));

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading spinner when loading', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isAdmin: false,
      loading: true,
    });
    render(<ProtectedRoute>child</ProtectedRoute>);
    expect(screen.getByText('Loading Spinner')).toBeInTheDocument();
    expect(screen.getByTestId('flex-container')).toBeInTheDocument();
  });

  it('redirects to "/" if not authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
    });
    render(<ProtectedRoute>child</ProtectedRoute>);
    expect(screen.getByText('Navigate to /')).toBeInTheDocument();
  });

  it('renders children if authenticated and not requiring admin', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isAdmin: false,
      loading: false,
    });
    render(<ProtectedRoute>child</ProtectedRoute>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('redirects to "/" if requireAdmin is true and user is not admin', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isAdmin: false,
      loading: false,
    });
    render(<ProtectedRoute requireAdmin>child</ProtectedRoute>);
    expect(screen.getByText('Navigate to /')).toBeInTheDocument();
  });

  it('renders children if authenticated and is admin when requireAdmin is true', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      isAdmin: true,
      loading: false,
    });
    render(<ProtectedRoute requireAdmin>child</ProtectedRoute>);
    expect(screen.getByText('child')).toBeInTheDocument();
  });
});
