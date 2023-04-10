import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/"> HomePage </Link> 
            <Link to="/booking-management"> Booking Management </Link> 
            <Link to="/room-management"> Room Management </Link> 
            <Link to="/student-management"> Student Management </Link> 
            <Link to="/user-management"> User Management </Link> 

        </div>
    );
};
