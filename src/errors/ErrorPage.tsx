import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useAppSelector } from "@/app/hooks";
import { ROUTES } from "@/utils/constans";

const ErrorPage = ({
  status,
  message,
}: {
  status?: number;
  message?: string;
}) => {
  const routeError = useRouteError();
  const { authentication, userType } = useAppSelector((state) => state.auth);

  let homeRoute = ROUTES.HOME;
  if (authentication && userType === "Admin") homeRoute = ROUTES.ADMIN.ROOT;

  let finalMessage = "Something went wrong.";

  if (status && message) {
    finalMessage = `${status} - ${message}`;
  } else if (isRouteErrorResponse(routeError)) {
    finalMessage = `${routeError.status} - ${routeError.statusText}`;
  }

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Oops!
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "text.secondary", fontWeight: "400" }}
      >
        {finalMessage}
      </Typography>

      <Button
        variant="contained"
        href={homeRoute}
        sx={{ mt: 3, fontWeight: "600" }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
