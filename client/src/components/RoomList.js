import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import RoomRow from './RoomRow';
import { toast } from 'react-toastify';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/rooms`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleUpdate = async (updatedRoom) => {
    try {
      await axios.put(`${API_BASE_URL}/api/rooms/${updatedRoom._id}`, updatedRoom);
      setRooms(rooms.map((room) => (room._id === updatedRoom._id ? updatedRoom : room)));
      toast.success('Room updated successfully');
    } catch (error) {
      toast.error('Failed to update room');
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/rooms/${roomId}`);
      setRooms(rooms.filter((room) => room._id !== roomId));
      toast.success('Room deleted successfully');
    } catch (error) {
      toast.error('Failed to delete room');
    }
  };

  return (
    <div>
      <h2>Room List</h2>
      <ul>
        {rooms.map((room) => (
          <RoomRow
           key={room._id} 
           room={room} 
           onUpdate={handleUpdate} 
           onDelete={handleDelete} 
           />
        ))}
      </ul>
    </div>
  );
};

export default RoomList;