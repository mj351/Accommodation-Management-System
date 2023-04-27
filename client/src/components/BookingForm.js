import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const BookingForm = ({ userId, students, rooms, onSelect }) => {
  const [studentId, setStudentId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/booking`, {
        userId,
        studentId,
        roomId,
        startDate,
        endDate,
      });

      console.log('Booking created:', response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect({ studentId, roomId });
    }
  };

  useEffect(() => {
    handleSelect();
  }, [studentId, roomId]);


  return (
    <form onSubmit={handleSubmit}>
      {/* Existing form fields */}
      <div>
        <label htmlFor="studentId">Student</label>
        <select
          id="studentId"
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.email})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="roomId">Room</label>
        <select
          id="roomId"
          value={roomId}
          onChange={(event) => setRoomId(event.target.value)}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </div>
      <button type="submit">Book Room</button>
    </form>
  );
};

export default BookingForm;