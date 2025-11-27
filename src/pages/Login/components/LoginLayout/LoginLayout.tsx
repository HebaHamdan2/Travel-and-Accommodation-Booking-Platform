import { Box } from "@mui/material";
import LoginHero from "../LoginHero";
import LoginForm from "../LoginForm";

const LoginLayout = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
        }}
      >
        <LoginHero />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 6, md: 8 },
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginLayout;
