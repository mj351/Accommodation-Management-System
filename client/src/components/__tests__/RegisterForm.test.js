import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterForm from '../RegisterForm';

// Mock api module
jest.mock('../../api/axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
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

test('renders username, password, and role fields', () => {
  render(<RegisterForm />);

  expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('role dropdown has Staff and Admin options', () => {
  render(<RegisterForm />);

  const options = screen.getAllByRole('option');
  expect(options).toHaveLength(2);
  expect(options[0]).toHaveTextContent('Staff');
  expect(options[1]).toHaveTextContent('Admin');
});

test('role defaults to staff', () => {
  render(<RegisterForm />);

  const select = screen.getByRole('combobox');
  expect(select.value).toBe('staff');
});
