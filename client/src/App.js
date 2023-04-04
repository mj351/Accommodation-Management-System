import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route , Link } from 'react-router-dom';
import StudentManagementPage from './pages/StudentManagementPage'


function App() {
  return (
    <div className="App">
        <Navbar />
        <main>
        <StudentManagementPage />
      </main>
    </div>
  );
}

export default App;