import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import React from "react";
import { LayoutProps } from "../types";
import { ROUTES } from "../utils/constans";

const AdminAuthLayout: React.FC<LayoutProps> = ({ allowedRoles = [] }) => {
  const { userType, authentication } = useAppSelector((state) => state.auth);
  if (!authentication) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!authentication) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }
  return <Outlet />;
};

export default AdminAuthLayout;
