import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BookingManagementPage } from "./pages/BookingManagementPage";
import { RoomManagementPage } from "./pages/RoomManagementPage";
import { StudentManagementPage } from "./pages/StudentManagementPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import { NavigationBar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/booking-management"
            element={<BookingManagementPage />}
          />
          <Route path="/room-management" element={<RoomManagementPage />} />
          <Route
            path="/student-management"
            element={<StudentManagementPage />}
          />
          <Route path="/user-management" element={<UserManagementPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;