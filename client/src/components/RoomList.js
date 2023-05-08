import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

const RoomList = ({ rooms, setRooms }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [modal, setModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomId, setRoomId] = useState(false);
  const [description, setDescription] = useState("");

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (room) => {
    setRoomId(room._id);
    // console.log(room);
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
      // // console.log({ updatedRoom });
      const { data } = await axios.put(
        `${API_BASE_URL}/api/rooms/${roomId}`,
        updatedRoom
      );
      setRooms(rooms.map((room) => (room._id === roomId ? data : room)));
      // toast.success("Room updated successfully");
      setRoomId(null);
      setModal("Room updated successfully");
    } catch (error) {
      setModal("Failed to update room");
      // toast.error("Failed to update room");
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/rooms/${roomId}`);
      setRooms(rooms.filter((room) => room._id !== roomId));
      // toast.success("Room deleted successfully");
      setModal("Room deleted successfully");
    } catch (error) {
      // toast.error("Failed to delete room");
      setModal("Failed to delete room");
    }
  };
  const handleClose = () => {
    setModal(null);
  };
  // console.log(rooms);
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
      <Modal show={!!modal} onHide={handleClose} variant="secondary">
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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