import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const BookingManagementPage = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleFormSubmit = async (bookingData) => {
    try {
      await axios.post('/api/bookings', bookingData);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking.');
    }
  };

  return (
    <div>
      <h1>Booking Management</h1>
      <BookingForm onSubmit={handleFormSubmit} students={students} rooms={rooms} />
    </div>
  );
};

export default BookingManagementPage;