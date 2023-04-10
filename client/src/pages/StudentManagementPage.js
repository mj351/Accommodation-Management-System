import React, { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';
import AddStudentForm from '../components/AddStudentForm';
import StudentSearch from '../components/StudentSearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StudentManagementPage = () => {

  return (
    <div className="student-management">
      <h1>Student Management</h1>
      <StudentList />
      <AddStudentForm />
      <StudentSearch />
      <ToastContainer />
    </div>
  );
};
