import React from 'react';
import './App.css';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Accommodation Management System</h1>
      </header>
      <main>
        <StudentList />
        <AddStudentForm />
      </main>
    </div>
  );
}

export default App;
