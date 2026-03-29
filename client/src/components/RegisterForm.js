import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/users/register", {
        username,
        password,
        role,
      });

      toast.success("User registered successfully");
      setUsername("");
      setPassword("");
      setRole("staff");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.msg || "Error registering user");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            placeholder="username"
            required
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
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="auth-input"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="d-block mx-auto btn btn-secondary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
