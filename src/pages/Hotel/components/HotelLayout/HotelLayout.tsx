import Navbar from "../../../../components/Navbar";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
const DetailedHotelInfo = lazy(() => import("../DetailedHotelInfo"));

const HotelLayout = () => {
  return (
    <>
      <Navbar />
       <Suspense
        fallback={
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        }
      >
      <DetailedHotelInfo/>
     
       </Suspense>
    </>
  );
};

export default HotelLayout;
