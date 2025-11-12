import { useRef, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Wrapper from "../../../../components/Wrapper";
import { INITIAL_USER_DETAILS, STEPS } from "../../constans";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { UserDetailsFormValues } from "../../types";
import UserDetailsForm from "../UserDetailsForm/UserDetailsForm";
import BookingConfirmation from "../BookingConfirmation/BookingConfirmation";
import { clearCart } from "../../../../features/cart/cartSlice";
import YourSelections from "../YourSelections";

const CartStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] =
    useState<UserDetailsFormValues>(INITIAL_USER_DETAILS);

  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.cart.items);

  const formRef = useRef<{ submitForm: () => void } | null>(null);

  const handleNext = () => {
    // Step 0: prevent next if cart empty
    if (activeStep === 0 && items.length === 0) return;

    // Step 1: trigger form submit
    if (activeStep === 1 && formRef.current) {
      formRef.current.submitForm();
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleFormSubmit = (values: UserDetailsFormValues) => {
    setFormData(values);
    setActiveStep((prev) => prev + 1);
  };

  const handleReset = () => {
    dispatch(clearCart());
    setFormData(INITIAL_USER_DETAILS);
    setActiveStep(0);
  };

  return (
    <Wrapper>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>
          {activeStep === 0 && (
            <Stack spacing={3}>
              {items.length === 0 ? (
                <Typography color="text.secondary">
                  Your cart is empty.
                </Typography>
              ) : (
                <>
                  <YourSelections cartItems={items} />
                  <Divider sx={{ my: 2 }} />
                  
                </>
              )}
            </Stack>
          )}

          {activeStep === 1 && (
            <UserDetailsForm ref={formRef} onValidSubmit={handleFormSubmit} />
          )}

          {activeStep === 2 && (
            <BookingConfirmation
              customerDetails={formData}
              items={items}
              onReset={handleReset}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Box sx={{ flex: "1 1 auto" }} />

          {activeStep < 2 && (
            <Button
              onClick={handleNext}
              disabled={activeStep === 0 && items.length === 0}
            >
              {activeStep === STEPS.length - 1 ? "Finish" : "Next"}
            </Button>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default CartStepper;
