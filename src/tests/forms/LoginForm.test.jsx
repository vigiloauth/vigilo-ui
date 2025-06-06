import React from 'react';
import { message } from 'antd';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import LoginForm from '../../forms/LoginForm';
import * as userService from '../../service/user_service';

vi.mock('antd', async () => {
  const antd = await vi.importActual('antd');
  return {
    ...antd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

const loginMock = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: loginMock,
    isAuthenticated: false,
    isAdmin: false,
    loading: false,
    user: null,
  }),
}));

vi.mock('../../components/FlexContainer', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

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

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(userService, 'authenticateUser').mockImplementation(() =>
      Promise.resolve({})
    );
  });

  it('renders all form fields and buttons', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password/i)).toBeInTheDocument();
    expect(screen.getByText(/remember/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('calls authenticateUser and login on successful login', async () => {
    userService.authenticateUser.mockResolvedValueOnce({});
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'john.doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText(/sign in/i));
    await waitFor(() => {
      expect(userService.authenticateUser).toHaveBeenCalledWith({
        username: 'john.doe',
        password: 'password',
      });
      expect(message.success).toHaveBeenCalledWith(
        expect.stringMatching(/Login successful. You are being redirected/i)
      );
    });
  });

  it('shows error message on failed login', async () => {
    userService.authenticateUser.mockRejectedValueOnce(
      new Error('Login failed')
    );
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'john.doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText(/sign in/i));
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Login failed');
    });
  });
});
