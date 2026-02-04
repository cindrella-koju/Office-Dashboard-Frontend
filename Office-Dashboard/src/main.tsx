import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./pages/auth/authProvider";
import { router } from "./router";
import { RoleProvider } from "./context/RoleProvide";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RoleProvider>
        <RouterProvider router={router} />
      </RoleProvider>
    </AuthProvider>
  </StrictMode>
);
