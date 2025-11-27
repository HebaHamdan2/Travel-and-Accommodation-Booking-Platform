import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import LoginLayout from "./components/LoginLayout/LoginLayout";
import { ROUTES } from "../../utils/constans";

const Login = () => {
  const { authentication, userType } = useAppSelector((state) => state?.auth);

  if (authentication) {
    if (userType === "Admin") {
      return <Navigate to={ROUTES.ADMIN.ROOT} replace />;
    } else if (userType === "User") {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  }
  return <LoginLayout />;
};

export default Login;
