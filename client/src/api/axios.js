import axios from "axios";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

// Redirect to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("userID");
      localStorage.removeItem("userRole");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
