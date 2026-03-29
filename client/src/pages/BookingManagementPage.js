import React, { useState, useEffect } from "react";
import api from "../api/axios";
import BookingForm from "../components/BookingForm";
import { Container } from "react-bootstrap";

export const BookingManagementPage = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await api.get("/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <Container className="booking-management">
      <h1 className="text-center m-3">Booking Management</h1>
      <BookingForm students={students} rooms={rooms} setRooms={setRooms} />
    </Container>
  );
};
