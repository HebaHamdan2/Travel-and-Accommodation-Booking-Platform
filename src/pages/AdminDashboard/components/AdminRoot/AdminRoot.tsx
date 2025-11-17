import { Box, Typography } from "@mui/material";

const AdminRoot = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h5" fontWeight={600}>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography sx={{ mt: 1 }}>
        Use the menu to manage Cities, Hotels, and Rooms.
      </Typography>
    </Box>
  );
};

export default AdminRoot;
