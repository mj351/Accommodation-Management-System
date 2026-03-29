import React from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/booking-management" replace />;
  }

  return children;
};

export default ProtectedRoute;
