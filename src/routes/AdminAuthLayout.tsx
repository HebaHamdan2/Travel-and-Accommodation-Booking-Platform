import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import React from "react";
import { LayoutProps } from "../types";

const AdminAuthLayout: React.FC<LayoutProps> = ({ allowedRoles }) => {
  const { userType, authentication } = useAppSelector((state) => state.auth);
  if (!authentication) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userType)) return <Navigate to="/home" replace />;
  return <Outlet />;
};

export default AdminAuthLayout;
