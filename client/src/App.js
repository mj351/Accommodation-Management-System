import React from 'react';
import './App.css';
import AddRoomForm from './components/AddRoomForm';
import RoomList from './components/RoomList';


function App() {
  return (
    <div className="App">
      <main>
        <AddRoomForm />
        <RoomList />
      </main>
    </div>
  );
}

export default App;