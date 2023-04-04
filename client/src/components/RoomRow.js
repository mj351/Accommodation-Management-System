import React, { useState } from 'react';

const RoomRow = ({ room, onUpdate, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedRoomData, setUpdatedRoomData] = useState(room);

  const handleChange = (e) => {
    setUpdatedRoomData({ ...updatedRoomData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onUpdate(updatedRoomData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return editMode ? (
    <li key={room._id}>
      <input
        type="text"
        name="roomNumber"
        value={updatedRoomData.roomNumber}
        onChange={handleChange}
      />
      <input
        type="number"
        name="capacity"
        value={updatedRoomData.capacity}
        onChange={handleChange}
      />
      <input
        type="text"
        name="type"
        value={updatedRoomData.type}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={updatedRoomData.description}
        onChange={handleChange}
      />
      
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={() => onDelete(room._id)}>Delete</button>
    </li>
  ) : (
    <li key={room._id}>
      Room Number: {room.roomNumber} - Capacity: {room.capacity} - Type: {room.type} - Description: {room.description} - Current Bookings: {room.currentbookings.length}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => onDelete(room._id)}>Delete</button>
    </li>
  );
};

export default RoomRow;
