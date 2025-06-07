import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../context/AuthContext';

function TestComponent() {
  const { user, isAuthenticated, isAdmin, loading, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="user">{user ? user.name : ''}</span>
      <span data-testid="isAuthenticated">
        {isAuthenticated ? 'yes' : 'no'}
      </span>
      <span data-testid="isAdmin">{isAdmin ? 'yes' : 'no'}</span>
      <span data-testid="loading">{loading ? 'yes' : 'no'}</span>
      <button
        type="button"
        onClick={() =>
          login({ name: 'Alice', roles: ['ADMIN'] }, 'tokenA', 'tokenR')
        }
      >
        Login
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

let navigateMock;

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Mock useNavigate
    navigateMock = vi.fn();
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => navigateMock,
      };
    });
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('should provide default values when not authenticated', async () => {
    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      ));
    });
    expect(getByTestId('user').textContent).toBe('');
    expect(getByTestId('isAuthenticated').textContent).toBe('no');
    expect(getByTestId('isAdmin').textContent).toBe('no');
    expect(getByTestId('loading').textContent).toBe('no');
  });

  it('should restore user from localStorage if tokens and userData exist', async () => {
    localStorage.setItem('access_token', 'tokenA');
    localStorage.setItem('refresh_token', 'tokenR');
    localStorage.setItem(
      'userData',
      JSON.stringify({ name: 'Bob', roles: ['ADMIN'] })
    );

    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      ));
    });

    expect(getByTestId('user').textContent).toBe('Bob');
    expect(getByTestId('isAuthenticated').textContent).toBe('yes');
    expect(getByTestId('isAdmin').textContent).toBe('yes');
    expect(getByTestId('loading').textContent).toBe('no');
  });

  it('should clear localStorage if error occurs during checkAuth', async () => {
    localStorage.setItem('access_token', 'tokenA');
    localStorage.setItem('refresh_token', 'tokenR');
    localStorage.setItem('userData', '{bad json');

    let getByTestId;
    await act(async () => {
      ({ getByTestId } = render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      ));
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userData');
    expect(getByTestId('user').textContent).toBe('');
    expect(getByTestId('isAuthenticated').textContent).toBe('no');
    expect(getByTestId('isAdmin').textContent).toBe('no');
    expect(getByTestId('loading').textContent).toBe('no');
  });

  it('login should set user, tokens, and navigate', async () => {
    let getByTestId;
    let getByText;
    await act(async () => {
      ({ getByTestId, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      ));
    });

    await act(async () => {
      getByText('Login').click();
    });

    expect(getByTestId('user').textContent).toBe('Alice');
    expect(getByTestId('isAuthenticated').textContent).toBe('yes');
    expect(getByTestId('isAdmin').textContent).toBe('yes');
    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'tokenA');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refresh_token',
      'tokenR'
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify({ name: 'Alice', roles: ['ADMIN'] })
    );
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });

  it('logout should clear user, tokens, and navigate', async () => {
    let getByTestId;
    let getByText;
    await act(async () => {
      ({ getByTestId, getByText } = render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      ));
    });

    // Login first
    await act(async () => {
      getByText('Login').click();
    });

    // Then logout
    await act(async () => {
      getByText('Logout').click();
    });

    expect(getByTestId('user').textContent).toBe('');
    expect(getByTestId('isAuthenticated').textContent).toBe('no');
    expect(getByTestId('isAdmin').textContent).toBe('no');
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('userData');
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
