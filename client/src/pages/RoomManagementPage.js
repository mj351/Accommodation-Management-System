import React from 'react';
import RoomList from '../components/RoomList';
import AddRoomForm from '../components/AddRoomForm';
import RoomSearch from '../components/RoomSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const RoomManagementPage = () => {

  return (
    <div className="room-management">
      <h1>Room Management</h1>
      <RoomList />
      <AddRoomForm />
      <RoomSearch />
      <ToastContainer />
    </div>
  );
};