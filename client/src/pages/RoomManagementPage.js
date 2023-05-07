import React from "react";
import RoomList from "../components/RoomList";
import AddRoomForm from "../components/AddRoomForm";
import RoomSearch from "../components/RoomSearch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";

export const RoomManagementPage = () => {
  return (
    <Container className="room-management">
      <h1 className="text-center m-2 my-5">Room Management</h1>
      <AddRoomForm />
    </Container>
  );
};