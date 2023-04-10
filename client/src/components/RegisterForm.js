import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Add role state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/users/register`, { username, password, role }); // Include role in the request
      alert('User registered successfully');
      setUsername(''); // Clear username field
      setPassword(''); // Clear password field
      setRole(''); // Clear role field
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div className='user-container'>
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
           type="password"
           id="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} required
           />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;