import React, { useRef } from "react";
import { Box, Typography, Button, Grid, Paper, Divider } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { BookingConfirmationProps } from "../../types";
import { LOGO_URL } from "../../../../utils/constans";
import { getStatusColor } from "../../utils";

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  customerDetails,
  bookings,
  onReset,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Booking-${new Date().toISOString()}`,
  });
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", py: 4, px: { xs: 2, sm: 4 } }}>
      <Box ref={componentRef}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <Box textAlign="center" mb={3}>
            <img
              src={LOGO_URL}
              alt="Logo"
              style={{ width: 70, marginBottom: 16 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              Thank you, {customerDetails.fullName}!
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              Your {bookings.length}
              {bookings.length > 1 ? "rooms have" : "room has"} been
              successfully booked.
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {bookings.map((b, index) => (
              <Grid sx={{ xs: 12, sm: 6 }} key={index}>
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {b.hotelName}
                  </Typography>
                  <Typography variant="body2">
                    Room #: {b.roomNumber}
                  </Typography>
                  <Typography variant="body2">Type: {b.roomType}</Typography>
                  <Typography variant="body2">Total: ${b.totalCost}</Typography>
                  <Typography variant="body2">
                    Payment: {b.paymentMethod}
                  </Typography>

                  <Typography variant="body2">
                    Status:
                    <Box
                      component="span"
                      sx={{
                        color: getStatusColor(b.bookingStatus),
                        fontWeight: "medium",
                      }}
                    >
                      {b.bookingStatus}
                    </Box>
                  </Typography>

                  {b.confirmationNumber && (
                    <Typography variant="body2" fontWeight="medium">
                      Confirmation #: {b.confirmationNumber}
                    </Typography>
                  )}

                  <Typography variant="caption" color="text.secondary">
                    Booked on: {new Date(b.bookingDateTime).toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrint}
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "1rem",
            minWidth: { xs: "100%", sm: 160 },
          }}
        >
          Download PDF
        </Button>

        <Button
          variant="outlined"
          onClick={onReset}
          sx={{
            minWidth: { xs: "100%", sm: 160 },
            fontWeight: 700,
            borderRadius: "1rem",
          }}
        >
          Book Another
        </Button>
      </Box>
    </Box>
  );
};

export default BookingConfirmation;
