import { Box, Typography } from "@mui/material";

export default function OfflinePage() {
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        You are offline
      </Typography>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Please check your internet connection.
      </Typography>
    </Box>
  );
}
