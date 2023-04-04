import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route , Link } from 'react-router-dom';
import UserManagementPage from './pages/UserManagementPage'


function App() {
  return (
    <div className="App">
        <Navbar />
        <main>
        <UserManagementPage />
      </main>
    </div>
  );
}

export default App;