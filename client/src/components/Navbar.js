import {
    Button,
    Container,
    Nav,
    Navbar,
    Offcanvas,
  } from "react-bootstrap";
  import { NavLink, useNavigate } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";

  export const NavigationBar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate("/");
    };

    return (
      <Navbar key="lg" bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Accommodation System</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            style={{ background: "white" }}
          />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Accommodation System
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {!isAuthenticated && (
                  <NavLink to="/" className="nav-link">
                    Login
                  </NavLink>
                )}
                {isAuthenticated && (
                  <>
                    <NavLink to="/booking-management" className="nav-link">
                      Booking
                    </NavLink>
                    <NavLink to="/room-management" className="nav-link">
                      Room
                    </NavLink>
                    <NavLink to="/student-management" className="nav-link">
                      Student
                    </NavLink>
                    {user?.role === "admin" && (
                      <NavLink to="/user-management" className="nav-link">
                        User
                      </NavLink>
                    )}
                    <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-2">
                      Logout
                    </Button>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  };
