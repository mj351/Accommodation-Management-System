import React from 'react';
import RoomList from '../components/RoomList';
import AddRoomForm from '../components/AddRoomForm';

const RoomManagementPage = () => {
  //..
  return (
    <div>
      <h1>Room Management</h1>
      <RoomList />
      <AddRoomForm />
    </div>
  );
};

export default RoomManagementPage;