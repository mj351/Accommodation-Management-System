import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';

// Mock AuthContext
const mockLogin = jest.fn();
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    loading: false,
    user: null,
  }),
}));

// Mock api module
const mockPost = jest.fn();
jest.mock('../../api/axios', () => ({
  __esModule: true,
  default: {
    post: (...args) => mockPost(...args),
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

const renderLoginForm = () =>
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders username and password inputs and login button', () => {
  renderLoginForm();

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('shows error message on failed login', async () => {
  mockPost.mockRejectedValueOnce({
    response: { data: { message: 'Username or Password Is Incorrect!' } },
  });

  renderLoginForm();

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'baduser' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'badpass' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Username or Password Is Incorrect!'
    );
  });
});

test('calls login on successful submission', async () => {
  mockPost.mockResolvedValueOnce({
    data: { token: 'abc123', userID: '1', role: 'admin' },
  });

  renderLoginForm();

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'admin' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('abc123', '1', 'admin');
  });
});
