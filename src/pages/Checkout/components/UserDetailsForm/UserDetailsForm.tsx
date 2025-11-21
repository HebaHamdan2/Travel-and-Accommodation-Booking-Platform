import { forwardRef, useImperativeHandle } from "react";
import { Box, Stack, TextField, Typography, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import {
  UserDetailsFormHandle,
  UserDetailsFormProps,
  UserDetailsFormValues,
} from "../../types";
import { INITIAL_USER_DETAILS, PAYMENT_METHODS } from "../../constans";
import { UserDetailsValidationSchema } from "./validation";
import GenericTextField from "@/components/GenericTextField/GenericTextField";

const UserDetailsForm = forwardRef<UserDetailsFormHandle, UserDetailsFormProps>(
  ({ onValidSubmit, initialValues = INITIAL_USER_DETAILS }, ref) => {
    const formik = useFormik<UserDetailsFormValues>({
      initialValues,
      enableReinitialize: true,
      validationSchema: UserDetailsValidationSchema,
      onSubmit: (values) => {
        onValidSubmit(values);
      },
    });

    // Expose submitForm() to parent
    useImperativeHandle(ref, () => ({
      submitForm: () => formik.submitForm(),
    }));

    return (
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "100%" }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Your Details
          </Typography>

          <GenericTextField
            label="Full Name"
            {...formik.getFieldProps("fullName")}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={
              (formik.touched.fullName && formik.errors.fullName) || undefined
            }
          />

          <GenericTextField
            label="Email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              (formik.touched.email && formik.errors.email) || undefined
            }
          />

          <TextField
            select
            fullWidth
            label="Payment Method"
            {...formik.getFieldProps("paymentMethod")}
            error={
              formik.touched.paymentMethod &&
              Boolean(formik.errors.paymentMethod)
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
              <GenericTextField
                label="Card Number"
                {...formik.getFieldProps("cardNumber")}
                error={
                  formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
                }
                helperText={
                  (formik.touched.cardNumber && formik.errors.cardNumber) ||
                  undefined
                }
              />

              <GenericTextField
                label="Expiry Date (MM/YY)"
                {...formik.getFieldProps("cardExpiry")}
                error={
                  formik.touched.cardExpiry && Boolean(formik.errors.cardExpiry)
                }
                helperText={
                  (formik.touched.cardExpiry && formik.errors.cardExpiry) ||
                  undefined
                }
              />

              <GenericTextField
                label="CVV"
                {...formik.getFieldProps("cardCvv")}
                error={formik.touched.cardCvv && Boolean(formik.errors.cardCvv)}
                helperText={
                  (formik.touched.cardCvv && formik.errors.cardCvv) || undefined
                }
              />
            </>
          )}

          <GenericTextField
            label="Special Requests or Remarks"
            {...formik.getFieldProps("specialRequests")}
            multiline
            minRows={3}
          />
        </Stack>
      </Box>
    );
  }
);
export default UserDetailsForm;
