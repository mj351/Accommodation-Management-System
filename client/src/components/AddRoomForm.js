import React, { useState } from 'react';
import axios from 'axios';

const AddRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/rooms', { roomNumber, capacity });
      alert('Room added successfully');
      setRoomNumber('');
      setCapacity('');
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
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;