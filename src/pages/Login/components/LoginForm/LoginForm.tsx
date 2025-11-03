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
        maxWidth: 600,
        mx: "auto",
        textAlign: "center",
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 3, sm: 5 },
      }}
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
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
