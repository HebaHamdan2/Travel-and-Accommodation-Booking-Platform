import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "@/app/hooks";
import OfflinePage from "@/errors/OfflinePage";
import { Box } from "@mui/material";

const RootLayout = () => {
  const { userType } = useAppSelector((state) => state.auth);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    setTimeout(() => setOnline(navigator.onLine), 100);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!online) return <OfflinePage />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      {userType === "User" && <Footer />}
    </Box>
  );
};

export default RootLayout;
