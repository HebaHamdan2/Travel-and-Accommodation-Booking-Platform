import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import React from "react";
import { AccountCircle, Lock } from "@mui/icons-material";

const LoginForm: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        textAlign: "center",
        py: { xs: 4, sm: 6 },
        px: { xs: 3, sm: 5 },
      }}
    >
      <Box
        component="img"
        src="/Logo.svg"
        alt="Travel Logo"
        sx={{
          width: 200,
          height: "auto",
          mx: "auto",
        }}
      />
      <Typography variant="h3" sx={{ fontWeight: 700,fontSize:"5.5rem" }}>
        Welcome
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2, color: "text.secondary",fontSize:"1.5rem" }}>
        Login with username
      </Typography>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
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
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "primary.main",
            fontSize: "1rem",
            color: "text.primary",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            textTransform:"capitalize",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
