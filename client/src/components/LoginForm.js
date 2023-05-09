import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import {zxcvbn} form "zxcvbn"

const LoginForm = () => {
  const [_, setCookies] = useCookies(["authToken"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        username,
        password,
      });

      setCookies("authToken", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h2 className="text-center m-2 my-5">Login</h2> */}
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