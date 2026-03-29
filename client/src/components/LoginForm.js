import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/users/login", {
        username,
        password,
      });

      login(response.data.token, response.data.userID, response.data.role);
      toast.success("Logged in successfully");
      navigate("/booking-management");
    } catch (error) {
      const message =
        error.response?.data?.message || "Error logging in. Please try again.";
      setError(message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-group ">
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
            className="auth-input"
            placeholder="password"
          />
        </div>

        <button type="submit" className="d-block mx-auto btn btn-secondary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
