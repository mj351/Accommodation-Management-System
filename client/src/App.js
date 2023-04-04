import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
//import { BrowserRouter , Route , Link } from 'react-router-dom';
import BookingManagementPage from './pages/BookingManagementPage';

function App() {
  return (
    <div className="App">
        <Navbar />
        <main>
        <BookingManagementPage />

      </main>
    </div>
  );
}

export default App;