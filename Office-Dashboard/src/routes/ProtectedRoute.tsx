import { type ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import { EventRoleContext } from "../context/EventRoleContext";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  accessKey: string;
}

const ProtectedRoute = ({ children, accessKey }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const userrole = localStorage.getItem("role") ?? "member";

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  const roleContext1 = useContext(RoleContext);
  const roleContext2 = useContext(EventRoleContext);

  const roleContext = location.pathname.startsWith("/event/") && !["admin", "superadmin"].includes(userrole)
    ? roleContext2
    : roleContext1;

  const pageAccess = roleContext?.roleaccesspage;

  if (!pageAccess?.[accessKey]) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;