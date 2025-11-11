import React from "react";
import { HotelProps } from "../../types";
import Wrapper from "../../../../components/Wrapper";
import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { useGetAvailableRoomsQuery } from "../../../../services/hotels";
import InfoCard from "../../../../components/InfoCard";

const AvailableRooms: React.FC<HotelProps> = ({ hotelId }) => {
  const { checkInDate, checkOutDate } = useAppSelector((state) => state.search);
  const {
    data: rooms,
    isLoading,
    isError,
  } = useGetAvailableRoomsQuery({
    hotelId,
    checkInDate,
    CheckOutDate: checkOutDate,
  });
  if (isLoading) return <Typography>Loading Available Rooms...</Typography>;
  if (isError)
    return <Typography color="error">Failed to load Rooms.</Typography>;

  return (
    <>
      <Wrapper>
        <Typography
          variant="h2"
          fontWeight={600}
          fontSize="2rem"
          color="text.primary"
          mb={3}
        >
          Available Rooms
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {rooms?.map((room) => (
            <Grid key={room.roomId}>
              <InfoCard key={room.roomId} variant="roomCard" data={room} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </>
  );
};

export default AvailableRooms;
