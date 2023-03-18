import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  console.log("hey")

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/students`);
      setStudents(response.data);
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    console.log("students:" ,students);
    console.log("ur",API_BASE_URL,'/students');
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
       
       
      </ul>
    </div>
  );
};

export default StudentList;
