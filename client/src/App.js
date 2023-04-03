import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import RoomManagementPage from './pages/RoomManagementPage';


function App() {
  return (
    <div className="App">
      <main>
        <Navbar />
        <RoomManagementPage />
      </main>
    </div>
  );
}

export default App;