import React from 'react';
import RoomList from '../components/RoomList';
import AddRoomForm from '../components/AddRoomForm';
import StudentSearch from '../components/StudentSearch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RoomManagementPage = () => {
  //..
  return (
    <div>
      <h1>Room Management</h1>
      <RoomList />
      <AddRoomForm />
      <ToastContainer />
    </div>
  );
};

export default RoomManagementPage;