import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Select from "react-select";
import { AiOutlineUser } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { Card, Col, Row, Button, Modal, Spinner } from "react-bootstrap";

const BookingForm = ({ userId, students, rooms, onSelect, setRooms }) => {
  const [student, setStudent] = useState(null);
  const [room, setRoom] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  // // console.log(startDate);
  // // console.log(endDate);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/bookings`)
      .then((response) => {
        // // console.log(response.data);
        setLoading(false);
        setBookings(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      // // console.log(student.value, room.value, startDate, endDate);
      const response = await axios.post(`${API_BASE_URL}/api/bookings`, {
        // userId,
        studentId: student.value,
        roomId: room.value,
        startDate,
        endDate,
      });
      // // console.log("Booking created:", response.data);
      setBookings([response.data, ...bookings]);
      setLoading(false);
      setModal("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error.response.data.msg);
      setError(error.response.data.msg);
      setLoading(false);
    }
  };

  const studentOptions = students.map((student) => ({
    value: student._id,
    label: `${student.firstName} ${student.lastName} (${student.studentId})`,
  }));

  const roomOptions = rooms.map((room) => ({
    value: room._id,
    label: `Room no: ${room?.roomNumber}`,
  }));

  const handleSelect = () => {
    if (onSelect) {
      onSelect({ studentId: student.value, roomId: room.value });
    }
  };

  useEffect(() => {
    handleSelect();
  }, [student, room]);
  // console.log(bookings);

  const handleStartDateChange = (event) => {
    const selectedStartDate = new Date(event.target.value);
    let now = new Date();
    now.setHours(0, 0, 0);
    if (selectedStartDate <= now) {
      setError("Start date should be greater than current date");
      return;
    }
    if (endDate && selectedStartDate > new Date(endDate)) {
      setError("Start date should be less than end date");
      return;
    }
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = new Date(event.target.value);
    const selectedStartDate = new Date(startDate);
    if (selectedEndDate < selectedStartDate) {
      setError("End date should be greater than start date");
      return;
    }
    setEndDate(event.target.value);
  };

  const handleClose = () => {
    setError(null);
  };
  const handleCloseModal = () => {
    setModal(null);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Row>
        <Col lg={6} sm={12} className="mb-5">
          <Card
            text="light"
            className="mb-2 shadow-bottom-right"
            id="student-card"
          >
            <Card.Body
              style={{
                padding: "20px 50px 0 50px",
              }}
            >
              <form onSubmit={handleSubmit} className="mt-3">
                <div className="form-group">
                  <Select
                    id="studentId"
                    classNamePrefix="react-select"
                    value={student}
                    onChange={setStudent}
                    options={studentOptions}
                    placeholder={
                      <div>
                        <AiOutlineUser style={{ color: "black" }} />
                        <span style={{ marginLeft: "10px", color: "black" }}>
                          Select Student
                        </span>
                      </div>
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: "40px",
                        borderColor: "#ced4da",
                        "&:hover": { borderColor: "#80bdff" },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? "#80bdff" : "white",
                        color: state.isFocused ? "white" : "black",
                      }),
                    }}
                    isSearchable={false}
                  />
                </div>
                <div className="form-group">
                  <Select
                    id="roomId"
                    classNamePrefix="react-select"
                    value={room}
                    onChange={setRoom}
                    options={roomOptions}
                    placeholder={
                      <div>
                        <FaBed style={{ color: "black" }} />
                        <span style={{ marginLeft: "10px", color: "black" }}>
                          Select Room
                        </span>
                      </div>
                    }
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        minHeight: "40px",
                        borderColor: "#ced4da",
                        "&:hover": { borderColor: "#80bdff" },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      singleValue: (provided) => ({
                        ...provided,
                        color: "black",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused ? "#80bdff" : "white",
                        color: state.isFocused ? "white" : "black",
                      }),
                    }}
                    isSearchable={false}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Check-IN Date</label>
                  <input
                    id="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    type="date"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">Check-OUT Date</label>
                  <input
                    id="endDate"
                    value={endDate}
                    onChange={handleEndDateChange}
                    type="date"
                  />
                </div>

                <Modal show={!!error} onHide={handleClose} variant="danger">
                  <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{error}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={!!modal}
                  onHide={handleCloseModal}
                  variant="danger"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{modal}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <button
                  type="submit"
                  className="d-block mx-auto btn-booking"
                  disabled={!student || !startDate || !endDate || !room}
                >
                  Book Room
                </button>
              </form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} sm={12}>
          <Card
            border="secondary"
            // style={{ height: "460px", overflow: "auto" }}
            className="shadow-bottom-right"
          >
            <Card.Header className="h3">Bookings</Card.Header>
            <Card.Body style={{ height: "407px", overflow: "auto" }}>
              {bookings.length === 0 && (
                <Card
                  border="secondary"
                  style={{ width: "95%", margin: "0 auto 30px auto" }}
                >
                  <Card.Body>
                    <Card.Title>No Booking Found</Card.Title>
                  </Card.Body>
                </Card>
              )}
              {bookings.map((booking) => (
                <Card
                  border="secondary"
                  style={{ width: "95%", margin: "0 auto 30px auto" }}
                  key={booking._id}
                >
                  <Card.Header
                    className={
                      booking.status === "cancelled" && "bg-danger text-light"
                    }
                  >
                    Room No: {booking.room?.roomNumber}{" "}
                    {booking.status === "cancelled" && "(cancelled)"}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      {booking.student.firstName} {booking.student.lastName}
                    </Card.Title>
                    <Card.Text>
                      Check-in Date:{" "}
                      {new Date(booking.startDate).toDateString()}
                    </Card.Text>
                    <Card.Text>
                      Check-out Date: {new Date(booking.endDate).toDateString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default BookingForm;