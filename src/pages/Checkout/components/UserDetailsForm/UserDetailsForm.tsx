import  { forwardRef, useImperativeHandle } from "react";
import { Box, Stack, TextField, Typography, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { UserDetailsFormProps, UserDetailsFormValues } from "../../types";
import { INITIAL_USER_DETAILS, PAYMENT_METHODS } from "../../constans";
import { UserDetailsValidationSchema } from "./validation";

const UserDetailsForm = forwardRef<{ submitForm: () => void }, UserDetailsFormProps>(({ onValidSubmit }, ref) => {
  
    const formik = useFormik<UserDetailsFormValues>({
    initialValues: INITIAL_USER_DETAILS,
    validationSchema: UserDetailsValidationSchema,
    onSubmit: (values) => {
      onValidSubmit(values);
    },
  });

  // Expose submitForm method to parent (stepper)
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">Your Details</Typography>

        <TextField
          label="Full Name"
          {...formik.getFieldProps("fullName")}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
        />

        <TextField
          label="Email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          select
          label="Payment Method"
          {...formik.getFieldProps("paymentMethod")}
          error={
            formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)
          }
          helperText={
            formik.touched.paymentMethod && formik.errors.paymentMethod
          }
        >
          {PAYMENT_METHODS.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </TextField>
         {formik.values.paymentMethod === "Credit Card" && (
          <>
            <TextField
              label="Card Number"
              {...formik.getFieldProps("cardNumber")}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
            <TextField
              label="Expiry Date (MM/YY)"
              {...formik.getFieldProps("cardExpiry")}
              error={formik.touched.cardExpiry && Boolean(formik.errors.cardExpiry)}
              helperText={formik.touched.cardExpiry && formik.errors.cardExpiry}
            />
            <TextField
              label="CVV"
              {...formik.getFieldProps("cardCvv")}
              error={formik.touched.cardCvv && Boolean(formik.errors.cardCvv)}
              helperText={formik.touched.cardCvv && formik.errors.cardCvv}
            />
          </>
        )}

        <TextField
          label="Special Requests or Remarks"
          {...formik.getFieldProps("specialRequests")}
          multiline
          rows={3}
        />
      </Stack>
    </Box>
  );
});

export default UserDetailsForm;
