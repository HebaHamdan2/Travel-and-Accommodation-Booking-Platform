import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import LoginLayout from "./components/LoginLayout/LoginLayout";

const Login = () => {
  const { authentication, userType } = useAppSelector((state) => state?.auth);

  if (authentication) {
    if (userType === "Admin") {
      return <Navigate to="/admin" replace />;
    } else if (userType === "User") {
      return <Navigate to="/home" replace />;
    }
  }
  return <LoginLayout />;
};

export default Login;
