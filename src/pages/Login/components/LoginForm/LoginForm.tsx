import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../validation";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { loginUser } from "../../../../features/auth/authSlice";
import { LoginValues } from "../../../../types";
import CustomSnackbar from "../../../../components/CustomSnackbar";
const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "error";
  }>({ open: false, message: "" });

  const formik = useFormik({
    initialValues: { userName: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values: LoginValues) => {
      const res = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(res)) {
        setSnackbar({
          open: true,
          message: "Logged in successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message:
            (res.payload as { title?: string })?.title ||
            "Login failed! Check credentials.",
          severity: "error",
        });
      }
    },
  });
  const renderTextField = (
    name: "userName" | "password",
    label: string,
    type: string = "text",
    icon: React.ReactNode
  ) => (
    <TextField
      name={name}
      label={label}
      type={type}
      fullWidth
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );

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
        {renderTextField("userName", "Username", "text", <AccountCircle />)}
        {renderTextField("password", "Password", "password", <Lock />)}
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
      <CustomSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default LoginForm;
