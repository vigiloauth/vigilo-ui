import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../../pages/Login/LoginPage';

vi.mock('../../components/FlexContainer', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

vi.mock('../../forms/LoginForm', () => ({
  __esModule: true,
  default: () => <div data-testid="login-form">Mocked LoginForm</div>,
}));

vi.mock('antd', async () => {
  const antd = await vi.importActual('antd');
  return {
    ...antd,
    Typography: antd.Typography,
  };
});

if (!window.matchMedia) {
  window.matchMedia = function matchMedia() {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    };
  };
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all text fields', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Please sign in to continue/i)).toBeInTheDocument();
  });

  it('renders the Vigilo logo with the correct alt text and class', () => {
    render(<LoginPage />);
    const logo = screen.getByAltText(/Vigilo Auth Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('vigilo-logo');
  });

  it('renders the login card with the correct class', () => {
    render(<LoginPage />);
    const card = document.querySelector('.login-card');
    expect(card).toBeInTheDocument();
  });
});
