import { Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ROUTES } from "@/utils/constans";
import { useAppSelector } from "@/app/hooks";

const UnauthorizedPage = () => {
  const { authentication, userType } = useAppSelector((state) => state.auth);

  let homeRoute = ROUTES.HOME;
  if (authentication && userType === "Admin") homeRoute = ROUTES.ADMIN.ROOT;

  return (
    <Box
      sx={{
        p: 3,
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <LockOutlinedIcon
        sx={{
          fontSize: 120,
          mb: 2,
          color: "text.secondary",
        }}
      />

      <Typography variant="h4" gutterBottom>
        403 - Unauthorized
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ maxWidth: 400, color: "text.secondary", fontWeight: "400" }}
      >
        You do not have permission to access this page.
      </Typography>

      <Button
        variant="contained"
        href={homeRoute}
        sx={{ mt: 3, fontWeight: "600" }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
