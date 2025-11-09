import { PaletteMode, ThemeOptions } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: { main: "#E4A0B7" },
          secondary: { main: "#7DCFB6" },
          background: { default: "#FDFDFD", paper: "#FDFDFD" },
          text: { primary: "#2E2E2E", secondary: "#6F6F6F" },
          divider: "#E5E5E5",
          star:"#C49C74"
        }
      : {
          primary: { main: "#EBA6BE" },
          secondary: { main: "#80D4C2" },
          background: { default: "#1C1C1C", paper: "#2A2A2A" },
          text: { primary: "#F7F7F7", secondary: "#A8A8A8" },
          divider: "#333333",
        }),
  },
  typography: {
    fontFamily: `'Nunito', 'Inter', sans-serif`,
    h1: { fontFamily: `'Poppins', sans-serif`, fontWeight: 700 },
    h2: { fontFamily: `'Poppins', sans-serif`, fontWeight: 700 },
    h3: { fontFamily: `'Poppins', sans-serif`, fontWeight: 700 },
    h4: { fontFamily: `'Poppins', sans-serif`, fontWeight: 600 },
    h5:{ fontFamily: `'Nunito', 'Inter', sans-serif`, fontWeight: 600 },
    h6: { fontFamily: `'Nunito', 'Inter', sans-serif`, fontWeight: 600 },
    body1: { fontFamily: `'Nunito', 'Inter', sans-serif`, fontWeight: 600 },
    body2: { fontFamily: `'Nunito', 'Inter', sans-serif`, fontWeight: 400 },
  },
});
