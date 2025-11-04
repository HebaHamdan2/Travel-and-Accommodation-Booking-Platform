import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { AccountCircle, Lock } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../validation";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { loginUser } from "../../../../features/auth/authSlice";
import { LoginValues } from "../../../../types";
const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: LoginValues) => {
    setErrorMessage(null);
    try {
      const resAction = await dispatch(loginUser(values));

      if (loginUser.fulfilled.match(resAction)) {
        console.log("Logged in successfully:", resAction.payload);
      } else if (loginUser.rejected.match(resAction)) {
        const payload = resAction.payload as any;
        setErrorMessage(
          payload?.title || "Login failed! Check your username and password."
        );
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        textAlign: "center",
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 3, sm: 5 },
      }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        component="img"
        src="/Logo.svg"
        alt="Travel Logo"
        sx={{
          width: { xs: 120, sm: 160, md: 200 },
          height: "auto",
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
        <TextField
          name="userName"
          label="Username"
          variant="outlined"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userName}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ textAlign: "left" }}>
            {errorMessage}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "capitalize",
            bgcolor: "primary.main",
            color: "text.primary",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
