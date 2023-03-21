import React, { useState, useEffect } from 'react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import StudentSearch from '../components/StudentSearch';

const StudentManagementPage = () => {
  // State and API call logic goes here

  return (
    <div>
      <h1>Student Management</h1>
      <StudentList />
      <StudentForm />
      <StudentSearch />
    </div>
  );
};

export default StudentManagementPage;
