import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Button, Card, Col, Modal, Row, Spinner } from "react-bootstrap";
import StudentList from "./StudentList";
import { useEffect } from "react";

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/students`);
        setStudents(response.data);
        setLoading(false);

        // // console.log(response);
        // // console.log(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/students`, {
        firstName,
        lastName,
        studentId,
      });
      // console.log(data);
      setModal("Student added successfully");
      setFirstName("");
      setLastName("");
      setStudentId("");
      setStudents([...students, data]);
    } catch (error) {
      console.error("Error adding student:", error);
      setModal("Error adding student");
    }
  };
  const handleClose = () => {
    setModal(null);
  };

  return (
    <>
      <Row>
        <Col lg={7} sm={12}>
          <Card bg="light" text="dark" className="mb-2 shadow-bottom-right">
            <Card.Header className="py-4 px-5">Student</Card.Header>
            <Card.Body
              style={{
                padding: "20px 70px 0 50px",
              }}
            >
              <Card.Title className="p-3">Student List</Card.Title>
              {loading && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              {!loading && (
                <StudentList students={students} setStudents={setStudents} />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} sm={12}>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Student ID:</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="d-block mx-auto btn btn-secondary"
              >
                Add Student
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

export default AddStudentForm;