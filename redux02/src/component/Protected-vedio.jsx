import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedVedio = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Replace with your auth logic

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, allow access to the route
  return children;
};

export default ProtectedVedio;
