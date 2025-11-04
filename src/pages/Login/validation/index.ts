import * as Yup from "yup";
export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("username is required"),
  password: Yup.string().required("Password is required"),
});
