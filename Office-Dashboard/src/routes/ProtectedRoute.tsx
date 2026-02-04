import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";

interface ProtectedRouteProps {
  children: ReactNode;
  accessKey: string;
}

const ProtectedRoute = ({ children, accessKey }: ProtectedRouteProps) => {
  const role = useContext(RoleContext);
  const pageaccess = role?.roleaccesspage;

  if (!pageaccess?.[accessKey]) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
