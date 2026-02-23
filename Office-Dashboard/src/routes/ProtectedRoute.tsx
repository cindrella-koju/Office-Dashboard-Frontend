import { type ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import { useAuth } from "../hooks/useAuth";
import { EventRoleContext } from "../context/EventRoleContext";

interface ProtectedRouteProps {
  children: ReactNode;
  accessKey: string;
}

const ProtectedRoute = ({ children, accessKey }: ProtectedRouteProps) => {
  const location = useLocation();
  const userrole = localStorage.getItem("role")
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  const isEventRoute = location.pathname.startsWith("/event/");
  const roleContext = isEventRoute && !["admin", "superadmin"].includes(userrole ? userrole : "member")
    ? useContext(EventRoleContext)
    : useContext(RoleContext);

  const pageAccess = roleContext?.roleaccesspage;

  if (!pageAccess?.[accessKey]) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
