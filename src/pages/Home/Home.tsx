import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import HomeLayout from "./components/HomeLayout";

const Home = () => {
  const { userType } = useAppSelector((state) => state?.auth);
  if (userType === "Admin") {
    return <Navigate to="/admin" replace />;
  }
  return (
    <>
      <HomeLayout />
    </>
  );
};

export default Home;
