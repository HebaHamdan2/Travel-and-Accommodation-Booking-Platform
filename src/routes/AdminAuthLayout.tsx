import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const AdminAuthLayout = () => {
  const { userType, authentication } = useAppSelector((state) => state.auth);
  if (!authentication) {
    return <Navigate to="/login" replace />;
  }

  if (userType !== "Admin") {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default AdminAuthLayout;
