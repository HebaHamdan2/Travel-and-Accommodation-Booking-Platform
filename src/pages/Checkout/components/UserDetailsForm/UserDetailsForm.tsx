import { forwardRef, useImperativeHandle } from "react";
import { Box, Stack, Typography, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  UserDetailsFormHandle,
  UserDetailsFormProps,
  UserDetailsFormValues,
} from "../../types";
import { INITIAL_USER_DETAILS, PAYMENT_METHODS } from "../../constans";
import { UserDetailsValidationSchema } from "./validation";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
import { useAppSelector } from "@/app/hooks";
import { getDecodedToken } from "@/utils/getDecodedToken";
const UserDetailsForm = forwardRef<UserDetailsFormHandle, UserDetailsFormProps>(
  ({ onValidSubmit, initialValues }, ref) => {
    const { authentication } = useAppSelector((state) => state.auth);
    const token = getDecodedToken(authentication || "") ?? null;
    const fullName =
      token?.given_name && token?.family_name
        ? `${token.given_name} ${token.family_name}`
        : "";
    const mergedValues = {
      ...INITIAL_USER_DETAILS,
      ...initialValues,
      fullName,
    };
    const formik = useFormik<UserDetailsFormValues>({
      initialValues: mergedValues,
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
            id="fullName"
            label="Full Name"
            {...formik.getFieldProps("fullName")}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={
              (formik.touched.fullName && formik.errors.fullName) || undefined
            }
          />

          {/* Email */}
          <GenericTextField
            id="email"
            label="Email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              (formik.touched.email && formik.errors.email) || undefined
            }
          />
          <TextField
            id="paymentMethod"
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
                id="cardNumber"
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
                id="cardExpiry"
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
                id="cardCvv"
                label="CVV"
                {...formik.getFieldProps("cardCvv")}
                error={formik.touched.cardCvv && Boolean(formik.errors.cardCvv)}
                helperText={
                  (formik.touched.cardCvv && formik.errors.cardCvv) || undefined
                }
              />
            </>
          )}

          {/* Special Requests */}
          <GenericTextField
            id="specialRequests"
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
