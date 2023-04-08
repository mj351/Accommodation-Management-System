import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
//import { BrowserRouter , Route , Link } from 'react-router-dom';
import BookingManagementPage from './pages/BookingManagementPage';
import RoomManagementPage from './pages/RoomManagementPage';


function App() {
  return (
    <div className="App">
        <Navbar />
        <main>
        <BookingManagementPage />
        <RoomManagementPage />

      </main>
    </div>
  );
}

export default App;