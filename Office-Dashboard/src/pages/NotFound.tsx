import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to home if authenticated, otherwise to login
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
};

export default NotFound;
