import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Add role state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/users/register`, {
        username,
        password,
        role,
      });

      alert("User registered successfully");
      setUsername(""); // Clear username field
      setPassword(""); // Clear password field
      setRole(""); // Clear role field
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h2>Register</h2> */}
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            placeholder="username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
            placeholder="password"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            placeholder="role"
          />
        </div>
        <button type="submit" className="d-block mx-auto btn btn-secondary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;