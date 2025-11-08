import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const baseCardStyles: SxProps<Theme> = {
  borderRadius: "1rem",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
  },
};
