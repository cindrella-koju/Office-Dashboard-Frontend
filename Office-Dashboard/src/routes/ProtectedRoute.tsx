import { type ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RoleContext } from "../context/RoleContext";
import { GLOBAL_ROLE } from "../constants/showpage";
import { useAuth } from "../hooks/useAuth";
import { RETRIEVE_PERMISSION_WITHIN_EVENT } from "../constants/urls";
import useFetch from "../hooks/useFetch";
import { EventRoleContext } from "../context/EventRoleContext";

interface ProtectedRouteProps {
  children: ReactNode;
  accessKey: string;
}

const ProtectedRoute = ({ children, accessKey }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }


  const isEventRoute = location.pathname.startsWith("/event/");
  const roleContext = isEventRoute && !["admin", "superadmin"].includes(GLOBAL_ROLE)
    ? useContext(EventRoleContext)
    : useContext(RoleContext);

  console.log("Role Context:", roleContext)
  const pageAccess = roleContext?.roleaccesspage;

  if (!pageAccess?.[accessKey]) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// const EventAccessPage = () => {
//   const userId = localStorage.getItem("user_id")
//   const eventId = localStorage.getItem("event_id")

//   const {data : eventRoleDetail, loading, error } = useFetch(RETRIEVE_PERMISSION_WITHIN_EVENT(userId ? userId : "", eventId ? eventId : "")) 
//   if (loading) return null;
//   if (error) return null;
//   console.log(eventRoleDetail)
//   return eventRoleDetail
// }
