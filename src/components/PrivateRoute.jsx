import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'ADMIN') {
    return <Navigate to="/" />; // Or to an unauthorized page
  }

  return children;
};

export default PrivateRoute;
