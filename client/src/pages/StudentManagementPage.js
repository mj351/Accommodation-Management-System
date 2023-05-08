import React, { useState, useEffect } from "react";
import StudentList from "../components/StudentList";
import AddStudentForm from "../components/AddStudentForm";
import StudentSearch from "../components/StudentSearch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, Col, Container, Row } from "react-bootstrap";

export const StudentManagementPage = () => {
  return (
    <Container>
      <h1 className="text-center m-2 my-5">Student Management</h1>

      <AddStudentForm />
    </Container>
  );
};
