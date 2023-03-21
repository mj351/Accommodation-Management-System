import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h2>Room List</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            Room Number: {room.roomNumber} - Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;