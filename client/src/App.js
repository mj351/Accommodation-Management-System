import React from 'react';
import './App.css';
import AddStudentForm from './components/AddStudentForm';
import AddRoomForm from './components/AddRoomForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Accommodation Management System</h1>
      </header>
      <main>
        <AddStudentForm />
        <AddRoomForm />
      </main>
    </div>
  );
}

export default App;