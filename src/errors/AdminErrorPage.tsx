import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { ROUTES } from "@/utils/constans";

const AdminErrorPage = () => {
  const error = useRouteError();

  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} - ${error.statusText}`;
  }

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

      <Typography
        variant="h6"
        sx={{ color: "text.secondary", fontWeight: "400" }}
        gutterBottom
      >
        {message}
      </Typography>

      <Button
        variant="contained"
        href={ROUTES.ADMIN.ROOT}
        sx={{ mt: 2, fontWeight: "600" }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default AdminErrorPage;
