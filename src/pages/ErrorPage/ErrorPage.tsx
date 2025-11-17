import { useRouteError } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { ROUTES } from "../../utils/constans";


const ErrorPage= () => {
  const error: any = useRouteError();
  const { authentication, userType } = useAppSelector(state => state.auth);

  let homeRoute = ROUTES.HOME;
  if (authentication && userType === "Admin") homeRoute = ROUTES.ADMIN.ROOT;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h6" gutterBottom>
        {error?.statusText || error?.message || "Something went wrong."}
      </Typography>
      <Button variant="contained" href={homeRoute} sx={{ mt: 3 }}>
        Go {authentication ?( userType === "Admin" ? "Admin Dashboard" : "Home" ): "Home"}
      </Button>
    </Box>
  );
};

export default ErrorPage;
