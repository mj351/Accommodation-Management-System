import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, { username, password });
      // Handle successful login
      console.log('User logged in:', response.data);
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('Error logging in user');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
        Username:
          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;