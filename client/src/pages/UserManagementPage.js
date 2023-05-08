import React from "react";
import UserList from "../components/UserList";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { Card, Col, Container, Row } from "react-bootstrap";
import StudentList from "../components/StudentList";
import AddUserForm from "../components/AddUserForm";

export const UserManagementPage = () => {
  return (
    <Container>
      <h1 className="text-center m-2 my-5">User Management</h1>
      <AddUserForm />
    </Container>
  );
};