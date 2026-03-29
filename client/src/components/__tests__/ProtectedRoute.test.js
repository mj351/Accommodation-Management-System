import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// We need to control what useAuth returns per test, so we use a mutable ref
let mockAuthValue = {};

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthValue,
}));

// Import after mock is set up
import ProtectedRoute from '../ProtectedRoute';

const renderWithRouter = (initialRoute, roles) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/booking-management"
          element={<div>Booking Page</div>}
        />
        <Route
          path="/protected"
          element={
            <ProtectedRoute roles={roles}>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

test('redirects to / when not authenticated', () => {
  mockAuthValue = { isAuthenticated: false, loading: false, user: null };
  renderWithRouter('/protected');

  expect(screen.getByText('Home Page')).toBeInTheDocument();
  expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
});

test('renders children when authenticated', () => {
  mockAuthValue = {
    isAuthenticated: true,
    loading: false,
    user: { role: 'admin' },
  };
  renderWithRouter('/protected');

  expect(screen.getByText('Protected Content')).toBeInTheDocument();
});

test('redirects when user lacks required role', () => {
  mockAuthValue = {
    isAuthenticated: true,
    loading: false,
    user: { role: 'staff' },
  };
  renderWithRouter('/protected', ['admin']);

  expect(screen.getByText('Booking Page')).toBeInTheDocument();
  expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
});

test('shows loading spinner while loading', () => {
  mockAuthValue = { isAuthenticated: false, loading: true, user: null };
  renderWithRouter('/protected');

  expect(screen.getByRole('status')).toBeInTheDocument();
});
