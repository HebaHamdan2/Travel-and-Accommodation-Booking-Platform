import { useRouteError } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { ROUTES } from "../../utils/constans";

const AdminErrorPage = () => {
  const error: any = useRouteError();

  return (
    <Box
      sx={{
        p: 3,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Oops! Admin Error
      </Typography>
      <Typography variant="body1" gutterBottom>
        {error?.statusText || error?.message || "Something went wrong in the admin dashboard."}
      </Typography>
      <Button variant="contained" href={ROUTES.ADMIN.ROOT} sx={{ mt: 2 }}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default AdminErrorPage;
