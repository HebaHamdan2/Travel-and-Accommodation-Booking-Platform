import React from "react";
import { Box, Container } from "@mui/material";
import { WrapperProps } from "../../pages/Home/types";

const Wrapper: React.FC<WrapperProps> = ({ children, id }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 10,
        backgroundColor: "background.default",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
      id={id}
    >
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default Wrapper;
