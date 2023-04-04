import React, { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';
import AddStudentForm from '../components/AddStudentForm';
import StudentSearch from '../components/StudentSearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentManagementPage = () => {
  //State and API call logic goes here 

  return (
    <div>
      <h1>Student Management</h1>
      <StudentList />
      <AddStudentForm />
      <StudentSearch />
      <ToastContainer />
    </div>
  );
};

export default StudentManagementPage;
