import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationPage from '../../pages/Registration/RegistrationPage';

vi.mock('../../components/FlexContainer', () => ({
  __esModule: true,
  default: ({ children }) => children,
}));

vi.mock('../../forms/RegistrationForm', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="registration-form">Mocked RegistrationForm</div>
  ),
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

describe('RegistrationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all text fields', () => {
    render(<RegistrationPage />);
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
  });

  it('renders the Vigilo logo with correct alt text and class', () => {
    render(<RegistrationPage />);
    const logo = screen.getByAltText(/Vigilo Auth Logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('vigilo-logo');
  });

  it('renders the registration card with correct class', () => {
    render(<RegistrationPage />);
    const card = document.querySelector('.registration-card');
    expect(card).toBeInTheDocument();
  });

  it('renders the registration title with correct class and level', () => {
    render(<RegistrationPage />);
    const title = screen.getByText(/Create your account/i);
    expect(title).toHaveClass('registration-title');
    expect(title.tagName).toBe('H2');
  });
});
