import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Card, Col, Row, Spinner, Modal, Button } from "react-bootstrap";
import RoomList from "./RoomList";
import { useEffect } from "react";

const AddRoomForm = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [currentbookings, setCurrentBookings] = useState([]);
  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/rooms`);
      setRooms(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  const handleClose = () => {
    setModal(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/rooms`, {
        roomNumber,
        capacity,
        type,
        description,
        currentbookings,
      });
      setModal("Room added successfully");
      setRooms([...rooms, data]);
      setRoomNumber("");
      setCapacity("");
      setType("");
      setDescription("");
      setCurrentBookings([]);
      setLoading(false);
    } catch (error) {
      console.error("Error adding room:", error);
      setLoading(false);
      alert("Error adding room");
    }
  };

  return (
    <>
      <Row>
        <Col lg={7} sm={12}>
          <Card bg="light" text="dark" className="mb-2 shadow-bottom-right">
            <Card.Header className="py-4 px-5">Rooms</Card.Header>
            <Card.Body
              style={{
                padding: "20px 70px 0 50px",
              }}
            >
              <Card.Title className="p-3">Room List</Card.Title>
              {loading && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              {!loading && <RoomList rooms={rooms} setRooms={setRooms} />}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} sm={12}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="mt-2">Add Room</h2>
            <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="d-block mx-auto btn btn-secondary"
              >
                Add Room
              </button>
            </form>
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
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddRoomForm;