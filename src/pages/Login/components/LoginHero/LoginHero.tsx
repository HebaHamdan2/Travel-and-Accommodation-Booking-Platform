import { Box } from "@mui/material";
const LoginHero = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('/LoginImg.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    />
  );
};

export default LoginHero;
