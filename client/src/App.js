import React from 'react';
import './App.css';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';


function App() {
  return (
    <div className="App">
      <main>
        <AddStudentForm />
        <StudentList />
      </main>
    </div>
  );
}

export default App;