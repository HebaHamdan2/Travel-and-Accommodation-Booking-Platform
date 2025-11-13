import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import React from "react";
import { LayoutProps } from "../types";

const ProtectedLayout:React.FC<LayoutProps> = ({allowedRoles}) => {
  const { authentication ,userType} = useAppSelector((state) => state.auth);

  if (!authentication) {
    return <Navigate to="/login" replace />;
  }
   if (!allowedRoles.includes(userType))
    return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
