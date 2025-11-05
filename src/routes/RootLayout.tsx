import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Container maxWidth="lg">
      <Outlet />
    </Container>
  );
};

export default RootLayout;
