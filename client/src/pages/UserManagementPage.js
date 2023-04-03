import React from 'react';
import UserList from '../components/UserList';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const UserManagementPage = () => {
  
  return (
    <div>
      <h1>User Management</h1>
      <UserList />
      <RegisterForm />
      <LoginForm />
    </div>
  );
};

export default UserManagementPage;