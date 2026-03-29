import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (cookies.authToken) {
        try {
          const res = await api.get("/api/users/me");
          setUser(res.data);
        } catch (err) {
          // Token invalid — clear everything
          removeCookie("authToken", { path: "/" });
          localStorage.removeItem("userID");
          localStorage.removeItem("userRole");
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = (token, userID, role) => {
    setCookie("authToken", token, { path: "/" });
    localStorage.setItem("userID", userID);
    localStorage.setItem("userRole", role);
    setUser({ _id: userID, role });
  };

  const logout = () => {
    removeCookie("authToken", { path: "/" });
    localStorage.removeItem("userID");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
