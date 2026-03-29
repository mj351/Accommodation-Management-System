import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the api module to prevent real HTTP requests
jest.mock('./api/axios', () => ({
  get: jest.fn(() => Promise.reject(new Error('not authenticated'))),
  post: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

// Mock Navbar to avoid react-bootstrap Offcanvas matchMedia issues in jsdom
jest.mock('./components/Navbar', () => ({
  NavigationBar: () => <nav data-testid="navbar">Accommodation System</nav>,
}));

test('renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Accommodation System/i)).toBeInTheDocument();
});

test('unauthenticated user sees Login and Register toggle buttons', () => {
  render(<App />);
  // HomePage renders Login and Register toggle buttons plus the LoginForm submit
  const loginButtons = screen.getAllByRole('button', { name: /login/i });
  expect(loginButtons.length).toBeGreaterThanOrEqual(1);
  expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});
