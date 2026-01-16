// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />; // Redirect to Login if not logged in
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect if wrong role
  }

  return children;
};

export default ProtectedRoute;