import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const BookingForm = ({ onSubmit, students, rooms }) => {
  const [studentId, setStudentId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [moveInDate, setMoveInDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ studentId, roomId, moveInDate });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="moveInDate">Move-in Date</label>
        <input
          type="date"
          id="moveInDate"
          value={moveInDate}
          onChange={(event) => setMoveInDate(event.target.value)}
        />
      </div>
      <button type="submit">Book Room</button>
    </form>
  );
};

export default BookingForm;