import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { BookingManagementPage } from "./pages/BookingManagementPage";
import { RoomManagementPage } from "./pages/RoomManagementPage";
import { StudentManagementPage } from "./pages/StudentManagementPage";
import { UserManagementPage } from "./pages/UserManagementPage";
import { NavigationBar } from "./components/Navbar";

function NotFoundPage() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavigationBar />
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/booking-management"
              element={
                <ProtectedRoute>
                  <BookingManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/room-management"
              element={
                <ProtectedRoute>
                  <RoomManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-management"
              element={
                <ProtectedRoute>
                  <StudentManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
