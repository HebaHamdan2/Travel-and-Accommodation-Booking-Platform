import * as Yup from "yup";

export const UserDetailsValidationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
  // Credit card fields only required if payment method is "Credit Card"
  cardNumber: Yup.string().when("paymentMethod", {
    is: (val: string) => val === "Credit Card",
    then: (schema) =>
      schema
        .required("Card number is required")
        .matches(/^\d{16}$/, "Card number must be 16 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cardExpiry: Yup.string().when("paymentMethod", {
    is: (val: string) => val === "Credit Card",
    then: (schema) =>
      schema
        .required("Expiry date is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter expiry as MM/YY"),
    otherwise: (schema) => schema.notRequired(),
  }),

  cardCvv: Yup.string().when("paymentMethod", {
    is: (val: string) => val === "Credit Card",
    then: (schema) =>
      schema
        .required("CVV is required")
        .matches(/^\d{3,4}$/, "Enter 3 or 4 digit CVV"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
