import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Modal, Table, Button } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
const StudentList = ({ students, setStudents }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [sId, setsId] = useState("");
  const [modal, setModal] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = () => {
    setModal(null);
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (student) => {
    setsId(student._id);
    // console.log(student);
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setStudentId(student.studentId);

    setShowEditModal(true);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    handleCloseEditModal();

    try {
      const updatedStudent = { firstName, lastName, studentId };

      const { data } = await axios.put(
        `${API_BASE_URL}/api/students/${sId}`,
        updatedStudent
      );
      setStudents(
        students.map((student) => (student._id === sId ? data : student))
      );

      setsId(null);
      setModal("Student updated successfully");
    } catch (error) {
      setModal("Failed to update student");
    }
  };

  const handleDelete = async (stId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/students/${stId}`);
      setStudents(students.filter((student) => student._id !== stId));

      setModal("Student deleted successfully");
    } catch (error) {
      setModal("Failed to student student");
    }
  };

  return (
    <>
      <Table bordered={false} className="bg-transparent">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>StudentID</th>
            <th>Action</th>
          </tr>
        </thead>
        {students.map((student, i) => (
          <tbody key={i}>
            <tr>
              <td>{i + 1}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.studentId}</td>
              <td>
                <MdOutlineModeEditOutline
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => handleShowEditModal(student)}
                />
                <RiDeleteBin2Line
                  style={{ marginLeft: "5px", cursor: "pointer" }}
                  onClick={() => handleDelete(student._id)}
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

export default StudentList;