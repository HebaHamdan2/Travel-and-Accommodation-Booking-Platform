import React from "react";
import { AvailableRoomsProps } from "../../types";
import Wrapper from "../../../../components/Wrapper";
import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import { useGetAvailableRoomsQuery } from "../../../../services/user/hotels";
import InfoCard from "../../../../components/InfoCard";
import AvailableRoomsSkeleton from "../../skeletons/AvailableRoomsSkeleton";

const AvailableRooms: React.FC<AvailableRoomsProps> = ({
  hotelName,
  hotelId,
}) => {
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
  if (isLoading) return <AvailableRoomsSkeleton />;
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
        {!rooms || rooms.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" fontWeight={500}>
              No rooms available for your selected dates.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Try changing your dates or room preferences to see more options.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {rooms?.map((room) => (
              <Grid key={room.roomId}>
                <InfoCard
                  key={room.roomId}
                  variant="roomCard"
                  data={{
                    ...room,
                    hotelName,
                    checkInDate,
                    checkOutDate,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Wrapper>
    </>
  );
};

export default AvailableRooms;
