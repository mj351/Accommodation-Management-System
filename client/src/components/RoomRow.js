import React, { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
const RoomRow = ({ room, onUpdate, onDelete, i }) => {
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
    <tbody>
      <tr>
        <td>{i + 1}</td>
        <td>{room.roomNumber}</td>
        <td>{room.capacity}</td>
        <td>{room.type}</td>
        <td>
          <MdOutlineModeEditOutline
            style={{ marginRight: "5px" }}
            onClick={handleEdit}
          />
          <RiDeleteBin2Line
            style={{ marginLeft: "5px" }}
            onClick={() => onDelete(room._id)}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default RoomRow;