import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/students', { firstName, lastName, age, email, room });
      alert('Student added successfully');
      setFirstName('');
      setLastName('');
      setAge('');
      setEmail('');
      setRoom('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student');
    }
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Room ID:
          <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;