import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const hasAccess = auth?.roles && (Array.isArray(allowedRoles) ? allowedRoles.some((role) => auth.roles.includes(role)) : false);

  return hasAccess ? <Outlet /> : auth?.user ? <Navigate to="/unauthorized" state={{ from: location }} replace /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
