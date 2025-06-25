import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  console.log('PrivateRoutes check -> token:', token);

  if (!token) {
    console.log('Redirecting to /admin/login');
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoutes;
