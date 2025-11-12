import React from "react";
import { BookingConfirmationProps } from "../../types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectTotalCost } from "../../../../features/cart/selectTotalCost";
import { clearCart } from "../../../../features/cart/cartSlice";

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  customerDetails,
  items,
  onReset,
}) => {
  const dispatch = useAppDispatch();
  const totalCost = useAppSelector(selectTotalCost);
  const bookingDate = new Date().toLocaleString();
  const confirmationNumber = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  const handleFinish = () => {
    dispatch(clearCart());
    onReset();
  };

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 800,
        margin: "auto",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Stack spacing={2} alignItems="center" mb={3}>
          <Typography variant="h6" fontSize="2rem">
            Booking Confirmed!
          </Typography>
        </Stack>
        <Stack  spacing={1}>
          <Typography variant="body1">
            <strong>Customer Name:</strong> {customerDetails.fullName}
          </Typography>
          <Typography variant="body1">
            <strong>Customer Email:</strong> {customerDetails.email}
          </Typography>
          <Typography variant="body1">
            <strong>Payment Method:</strong> {customerDetails.paymentMethod}
          </Typography>
          {customerDetails.specialRequests && (
            <Typography variant="body1">
              <strong>Special Requests:</strong>{" "}
              {customerDetails.specialRequests}
            </Typography>
          )}
        </Stack>
        <Stack spacing={2} mb={3}>
          {items?.map((hotel) => (
            <Box
              key={hotel.hotelName}
              sx={{ mb: 2, p: 2, border: "1px solid", borderColor:"divider", borderRadius: 2 }}
            >
              <Typography
                variant="subtitle1"
                textAlign="left"
                fontWeight={600}
                mb={1}
              >
                {hotel.hotelName}
              </Typography>
              {hotel.rooms.map((room) => (
                <Grid container key={room.roomId} spacing={1}>
                  <Grid sx={{ xs: 6 }}>
                    Room {room.roomNumber} – {room.roomType}
                  </Grid>
                  <Grid sx={{ xs: 6 }} textAlign="right">
                    ${room.price}/night
                  </Grid>
                </Grid>
              ))}
              <Typography variant="body2" textAlign="left" mt={1}>
                <strong>Check-in:</strong> {hotel.checkInDate} |{" "}
                <strong>Check-out:</strong> {hotel.checkOutDate}
              </Typography>
              <Typography variant="body2" textAlign="left" fontWeight={600}>
                Total for hotel: ${hotel.totalPrice.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Typography
          variant="subtitle1"
          fontSize="1rem"
          fontWeight={500}
          color="text.secondary"
        >
          Confirmation Number: <strong>{confirmationNumber}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Booking Date: {bookingDate}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={700}>
            Total Cost:
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={700}>
            ${totalCost.toFixed(2)}
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600 }}
            color="secondary"
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600 }}
            color="primary"
            onClick={handleFinish}
          >
            Finish & Clear
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BookingConfirmation;
