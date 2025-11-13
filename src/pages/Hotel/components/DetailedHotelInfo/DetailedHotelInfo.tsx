import { Grid, Stack } from "@mui/material";
import VisualGallery from "../VisualGallery";
import HotelInteractiveMap from "../HotelInteractiveMap";
import HotelDesc from "../HotelDesc";
import Wrapper from "../../../../components/Wrapper";
import { useGetHotelDetailsQuery } from "../../../../services/user/hotels";
import React from "react";
import DetailedHotelSkeleton from "../../skeletons/DetailedHotelSkeleton/DetailedHotelSkeleton";
import HotelsReviews from "../HotelReviews";
import AvailableRooms from "../AvailableRooms";
import { useParams } from "react-router-dom";
const DetailedHotelInfo: React.FC = () => {
  let params = useParams();
  const hotelId = Number(params.hotelId);
  const { data: hotel, isLoading, isError } = useGetHotelDetailsQuery(hotelId);

  if (isLoading) return <DetailedHotelSkeleton />;
  if (isError)
    return <p style={{ color: "red" }}>Failed to load hotel details.</p>;

  return (
    <>
      <Wrapper>
        <Grid
          container
          spacing={4}
          alignContent="center"
          justifyContent="center"
        >
          <Grid sx={{ xs: 12, md: 6 }}>
            <Stack spacing={3} maxWidth="38rem">
              <HotelDesc hotel={hotel} />
              {hotel && (
                <HotelInteractiveMap
                  latitude={hotel.latitude}
                  longitude={hotel.longitude}
                />
              )}
            </Stack>
          </Grid>
          <Grid sx={{ xs: 12, md: 6, mt: "4rem" }}>
            <VisualGallery hotelId={hotelId} />
          </Grid>
        </Grid>
      </Wrapper>
      <HotelsReviews hotelId={hotelId} />
      <AvailableRooms hotelName={hotel?.hotelName || ""} hotelId={hotelId} />
    </>
  );
};

export default DetailedHotelInfo;
