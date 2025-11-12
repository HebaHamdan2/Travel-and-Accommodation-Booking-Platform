import { useRef, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Wrapper from "../../../../components/Wrapper";
import { INITIAL_USER_DETAILS, STEPS } from "../../constans";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { UserDetailsFormValues } from "../../types";
import UserDetailsForm from "../UserDetailsForm/UserDetailsForm";
import BookingConfirmation from "../BookingConfirmation/BookingConfirmation";
import YourSelections from "../YourSelections";
import { CartItem } from "../../../../features/types";
import { clearCart } from "../../../../features/cart/cartSlice";
import { useCreateBookingMutation } from "../../../../services/booking";

const CheckoutStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] =
    useState<UserDetailsFormValues>(INITIAL_USER_DETAILS);
  const [bookingResponses, setBookingResponses] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state: RootState) => state.cart);
  const formRef = useRef<{ submitForm: () => void } | null>(null);
  const [createBooking, { isLoading: creating }] = useCreateBookingMutation();

  const handleNext = () => {
    if (activeStep === 0 && items.length === 0) return;
    if (activeStep === 1 && formRef.current) {
      formRef.current.submitForm();
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleFormSubmit = (values: UserDetailsFormValues) => {
    setFormData(values);
    setActiveStep((prev) => prev + 1); // Go to Payment step next
  };

  const handlePayment = async () => {
    const bookings = items.flatMap((hotel: CartItem) =>
      hotel.rooms.map((room) => ({
        roomNumber: room.roomNumber.toString(),
        customerName: formData.fullName,
        hotelName: hotel.hotelName,
        roomType: room.roomType,
        totalCost: room.price,
        paymentMethod: formData.paymentMethod,
        bookingDateTime: new Date().toISOString(),
      }))
    );

    try {
      const results = await Promise.all(
        bookings.map((b) => createBooking(b).unwrap())
      );
      setBookingResponses(results.length ? results : bookings);
      dispatch(clearCart());
    } catch {
      setBookingResponses(bookings);
    } finally { 
      setOpenDialog(true);
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    dispatch(clearCart());
    setFormData(INITIAL_USER_DETAILS);
    setBookingResponses([]);
    setActiveStep(0);
  };

  return (
    <Wrapper>
      <Paper
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          mx: "auto",
          width: "100%",
          maxWidth: "1000px",
          overflow: "hidden",
        }}
      >
        <Stepper
          activeStep={activeStep}
          sx={{
            typography: { xs: "body2", sm: "body1" },
            mb: { xs: 3, sm: 4 },
          }}
        >
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, minHeight: { xs: 250, sm: 350 } }}>
          {activeStep === 0 &&
            (items.length === 0 ? (
              <Typography align="center" variant="h6" color="text.secondary">
                Your cart is empty. Add some rooms to continue.
              </Typography>
            ) : (
              <YourSelections cartItems={items} />
            ))}

          {activeStep === 1 && (
            <UserDetailsForm
              ref={formRef}
              initialValues={formData}
              onValidSubmit={handleFormSubmit}
            />
          )}

          {activeStep === 2 && (
            <Box textAlign="center">
              <Typography variant="h6" mb={2}>
                Review & Pay
              </Typography>
              <Typography color="text.secondary">
                Please confirm your details and click below to complete payment.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, textTransform: "none" }}
                disabled={creating}
                onClick={handlePayment}
              >
                {creating ? "Processing..." : "Pay & Book"}
              </Button>
            </Box>
          )}

          {activeStep === 3 && (
            <BookingConfirmation
              customerDetails={formData}
              bookings={bookingResponses}
              onReset={handleReset}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
            mt: { xs: 3, sm: 4 },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {activeStep < 3 && (
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((prev) => prev - 1)}
              sx={{ color: "primary.main" }}
            >
              Back
            </Button>
          )}
          {activeStep < 3 && (
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleNext}
              disabled={activeStep === 0 && items.length === 0}
            >
              {activeStep === STEPS.length - 1 ? "Finish" : "Next"}
            </Button>
          )}
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Booking Complete</DialogTitle>
        <DialogContent>
          <Typography>Your booking has been successfully processed!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default CheckoutStepper;
