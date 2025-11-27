import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import React from "react";
import { LayoutProps } from "../types";
import { ROUTES } from "../utils/constans";

const ProtectedLayout: React.FC<LayoutProps> = ({ allowedRoles }) => {
  const { authentication, userType } = useAppSelector((state) => state.auth);

  if (!authentication) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  if (allowedRoles.length && !allowedRoles.includes(userType)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
