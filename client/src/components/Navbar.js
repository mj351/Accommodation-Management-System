import {
    Button,
    Container,
    Form,
    Nav,
    NavDropdown,
    Navbar,
    Offcanvas,
  } from "react-bootstrap";
  import { Link, NavLink } from "react-router-dom";
  
  export const NavigationBar = () => {
    return (
      <Navbar key="lg" bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Accomodation System</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-$"lg"`}
            style={{ background: "white" }}
          />
  
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-$"lg"`}
            aria-labelledby={`offcanvasNavbarLabel-expand-$"lg"`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$"lg"`}>
                Accomodation System
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink to="/" className="nav-link">
                  HomePage
                </NavLink>
                <NavLink to="/booking-management" className="nav-link">
                  Booking
                </NavLink>
                <NavLink to="/room-management" className="nav-link">
                  Room
                </NavLink>
                <NavLink to="/student-management" className="nav-link">
                  Student
                </NavLink>
                <NavLink to="/user-management" className="nav-link">
                  User
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    );
  };  