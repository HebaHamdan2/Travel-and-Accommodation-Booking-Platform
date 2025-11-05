import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ProtectedLayout = () => {
  const { authentication } = useAppSelector((state) => state.auth);

  if (!authentication) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
