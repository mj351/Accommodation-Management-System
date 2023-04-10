import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
//import { useCookies} from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  //const[_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${API_BASE_URL}/api/users/login`, {
        username, 
        password,
      });

      //setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div className='uesr-container'>
      <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;