import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const AddRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [currentbookings, setCurrentBookings] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/rooms`, { roomNumber, capacity, type, description, currentbookings });
      alert('Room added successfully');
      setRoomNumber('');
      setCapacity('');
      setType('');
      setDescription('');
      setCurrentBookings([]);
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Error adding room');
    }
  };

  return (
    <div>
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Room Number:
          <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Capacity:
          <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
        </label>
        <br />
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;