import { useContext, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import { EventRoleContext } from "../context/EventRoleContext";
import { GLOBAL_ROLE } from "../constants/showpage";

interface ProtectedRouteProps {
  children: ReactNode;
  accessKey: string;
}

const ProtectedRoute = ({ children, accessKey }: ProtectedRouteProps) => {
  const location = useLocation();

  // Decide which context to use based on the URL
  const isEventRoute = location.pathname.startsWith("/event/");
  const role = isEventRoute && !["admin", "superadmin"].includes(GLOBAL_ROLE)
    ? useContext(EventRoleContext)
    : useContext(RoleContext);

  const pageaccess = role?.roleaccesspage;

  if (!pageaccess?.[accessKey]) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

