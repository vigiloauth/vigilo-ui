import React from 'react';
import { message } from 'antd';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from '../../forms/RegistrationForm';
import * as userService from '../../service/user_service';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../components/FlexContainer', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('../service/config_service', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    requireUpper: true,
    requireNumber: true,
    requireSymbol: true,
    minLength: 8,
  })),
}));

vi.mock('../../service/user_service', () => ({
  registerUser: vi.fn(),
}));

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

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all input fields', () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm password/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it('shows password requirements when typing password', () => {
    render(<RegistrationForm />);
    const passwordInput = screen.getByPlaceholderText(/^password$/i);
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/one uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/one number/i)).toBeInTheDocument();
    expect(screen.getByText(/one special character/i)).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'Password2!' },
    });
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('calls registerUser and shows success message on valid submit', async () => {
    userService.registerUser.mockResolvedValueOnce({});
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(userService.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'Password1!',
          roles: ['ADMIN'],
        })
      );
      expect(message.success).toHaveBeenCalledWith(
        expect.stringMatching(/account created/i)
      );
    });
  });

  it('shows error message if registerUser throws', async () => {
    userService.registerUser.mockRejectedValueOnce(
      new Error('Registration failed')
    );
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'janesmith' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Registration failed');
    });
  });
});
import React from 'react';
import { message } from 'antd';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from '../../forms/RegistrationForm';
import * as userService from '../../service/user_service';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../components/FlexContainer', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock('../service/config_service', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    requireUpper: true,
    requireNumber: true,
    requireSymbol: true,
    minLength: 8,
  })),
}));

vi.mock('../../service/user_service', () => ({
  registerUser: vi.fn(),
}));

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

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all input fields', () => {
    render(<RegistrationForm />);
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/confirm password/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it('shows password requirements when typing password', () => {
    render(<RegistrationForm />);
    const passwordInput = screen.getByPlaceholderText(/^password$/i);
    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/one uppercase letter/i)).toBeInTheDocument();
    expect(screen.getByText(/one number/i)).toBeInTheDocument();
    expect(screen.getByText(/one special character/i)).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'Password2!' },
    });
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('shows error for invalid email formats', async () => {
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'johndoe@mailcom' },
    });
    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });

  it('calls registerUser and shows success message on valid submit', async () => {
    userService.registerUser.mockResolvedValueOnce({});
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(userService.registerUser).toHaveBeenCalledWith(
        expect.objectContaining({
          username: 'johndoe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'Password1!',
          roles: ['ADMIN'],
        })
      );
      expect(message.success).toHaveBeenCalledWith(
        expect.stringMatching(/account created/i)
      );
    });
  });

  it('shows error message if registerUser throws', async () => {
    userService.registerUser.mockRejectedValueOnce(
      new Error('Registration failed')
    );
    render(<RegistrationForm />);
    fireEvent.change(screen.getByPlaceholderText(/first name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'janesmith' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getByText(/sign up/i));
    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Registration failed');
    });
  });
});
