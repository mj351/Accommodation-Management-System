import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";

export const HomePage = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/booking-management" replace />;
  }

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center m-2">
        <Button
          variant={showLogin ? "primary" : "outline-primary"}
          className="mx-3"
          onClick={() => {
            setShowLogin(true);
            setShowRegister(false);
          }}
        >
          Login
        </Button>
        <Button
          variant={showRegister ? "primary" : "outline-primary"}
          className="mx-3"
          onClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        >
          Register
        </Button>
      </div>
      {showLogin && <LoginForm />}
      {showRegister && <RegisterForm />}
    </Container>
  );
};
