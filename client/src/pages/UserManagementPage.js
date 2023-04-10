import React from 'react';
import UserList from '../components/UserList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

 export const UserManagementPage = () => {
  
  return (
    <div className="user-management">
      <h1>User Management</h1>
      <RegisterForm />
      <LoginForm />
    </div>
  );
};