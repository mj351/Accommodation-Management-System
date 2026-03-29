import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Table, Modal, Button } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

const RoomList = ({ rooms, setRooms }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomId, setRoomId] = useState(false);
  const [description, setDescription] = useState("");

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (room) => {
    setRoomId(room._id);
    setRoomNumber(room.roomNumber);
    setCapacity(room.capacity);
    setType(room.type);
    setDescription(room.description);
    setShowEditModal(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    handleCloseEditModal();

    try {
      const updatedRoom = { roomNumber, capacity, type, description };
      const { data } = await api.put(`/api/rooms/${roomId}`, updatedRoom);
      setRooms(rooms.map((room) => (room._id === roomId ? data : room)));
      setRoomId(null);
      toast.success("Room updated successfully");
    } catch (error) {
      toast.error("Failed to update room");
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await api.delete(`/api/rooms/${roomId}`);
      setRooms(rooms.filter((room) => room._id !== roomId));
      toast.success("Room deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete room");
    }
  };

  return (
    <>
      <Table bordered={false} className="bg-transparent">
        <thead>
          <tr>
            <th>#</th>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        {rooms.map((room, i) => (
          <tbody key={i}>
            <tr>
              <td>{i + 1}</td>
              <td>{room.roomNumber}</td>
              <td>{room.capacity}</td>
              <td>{room.type}</td>
              <td>
                <MdOutlineModeEditOutline
                  style={{ marginRight: "5px", cursor: "pointer" }}
                  onClick={() => handleShowEditModal(room)}
                />
                <RiDeleteBin2Line
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => handleDelete(room._id)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Room Number:</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Capacity:</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseEditModal}>
            Close
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleUpdate}
            type="submit"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomList;
