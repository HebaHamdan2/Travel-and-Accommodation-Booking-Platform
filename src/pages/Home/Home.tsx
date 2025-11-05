import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Home = () => {
  const { userType } = useAppSelector((state) => state?.auth);
  if (userType === "Admin") {
    return <Navigate to="/admin" replace />;
  }
  return <>home</>;
};

export default Home;
