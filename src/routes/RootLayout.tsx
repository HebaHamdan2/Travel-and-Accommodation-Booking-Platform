import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "@/app/hooks";

const RootLayout = () => {
  const { userType } = useAppSelector((state) => state.auth);

  return (
    <>
      <Outlet />
      {userType === "User" && <Footer />}
    </>
  );
};

export default RootLayout;
