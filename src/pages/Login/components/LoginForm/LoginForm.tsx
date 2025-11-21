import { Box, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../validation";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { login } from "../../../../features/auth/authSlice";
import { LoginValues } from "../../../../types";
import { showNotification } from "../../../../features/notifications/notificationsSlice";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  async function handleSubmit(values: LoginValues) {
    const res = await dispatch(login(values));
    if (login.fulfilled.match(res)) {
      dispatch(
        showNotification({
          message: "Logged in successfully!",
          type: "success",
        })
      );
    } else {
      const errorMsg =
        (res.payload as { title?: string })?.title ||
        "Login failed! Check credentials.";
      dispatch(
        showNotification({
          message: errorMsg,
          type: "error",
        })
      );
    }
  }
  const formik = useFormik({
    initialValues: { userName: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 3, sm: 5 },
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src="/Home/Logo.svg"
        alt="Travel Logo"
        sx={{
          width: { xs: 120, sm: 160, md: 200 },
          mb: { xs: 2, sm: 3 },
          mx: "auto",
        }}
      />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", sm: "2.8rem", md: "3.2rem" },
          mb: 1,
        }}
      >
        Welcome
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          mb: { xs: 3, sm: 4 },
          color: "text.secondary",
          fontSize: { xs: "1rem", sm: "1.1rem" },
        }}
      >
        Login with username
      </Typography>
      <Stack spacing={{ xs: 2.5, sm: 3 }}>
        <GenericTextField
          name="userName"
          label="Username"
          icon={<AccountCircle />}
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && !!formik.errors.userName}
          helperText={
            (formik.touched.userName && formik.errors.userName) || undefined
          }
        />
        <GenericTextField
          name="password"
          label="Password"
          type="password"
          icon={<Lock />}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          helperText={
            (formik.touched.password && formik.errors.password) || undefined
          }
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading || !formik.isValid || !formik.dirty}
          sx={{
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "capitalize",
            bgcolor: "primary.main",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.dark" },
            "&.Mui-disabled": {
              bgcolor: "primary.main",
              color: "text.primary",
            },
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
