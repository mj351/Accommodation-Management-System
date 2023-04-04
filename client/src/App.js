import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route , Link } from 'react-router-dom';
import RoomManagementPage from './pages/RoomManagementPage';


function App() {
  return (
    <div className="App">
        <Navbar />
        <main>
        <RoomManagementPage/>
      </main>
    </div>
  );
}

export default App;