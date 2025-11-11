import { useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
const DetailedHotelInfo = lazy(() => import("../DetailedHotelInfo"));
const HotelsReviews = lazy(() => import("../HotelReviews"));
const AvailableRooms = lazy(() => import("../AvailableRooms"));

const HotelLayout = () => {
  let params = useParams();
  const hotelId = Number(params.hotelId);
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
      <DetailedHotelInfo hotelId={hotelId} />
      <HotelsReviews hotelId={hotelId} />
      <AvailableRooms hotelId={hotelId} />
       </Suspense>
    </>
  );
};

export default HotelLayout;
