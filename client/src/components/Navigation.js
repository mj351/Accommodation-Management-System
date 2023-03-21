import React from 'react';
import { NavLink } from 'react-router-dom';




const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        {isAuthenticated() ? (
          <>
            <li>
              <NavLink to="/room-management">Room Management</NavLink>
            </li>
            <li>
              <NavLink to="/user-management">User Management</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;