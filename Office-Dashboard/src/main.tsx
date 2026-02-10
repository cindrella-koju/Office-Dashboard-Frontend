import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./pages/auth/authProvider";
import { router } from "./router";
import { RoleProvider } from "./context/RoleProvide";
import { EventRoleProvider } from "./context/EventRoleProvider";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <RoleProvider>
          <EventRoleProvider>
            <RouterProvider router={router} />
          </EventRoleProvider>
        </RoleProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
