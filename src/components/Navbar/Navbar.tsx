import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useAppDispatch } from "../../app/hooks";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { LOGO_URL } from "../../utils/constans";
import { performLogout } from "../../features/auth/logoutHelper";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mode, toggleMode } = useThemeContext();

  const handleLogout = async () => {
    dispatch(performLogout());
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        boxShadow: "none",
        my: "2rem",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            px: { xs: 1, md: 0 },
            py: { xs: 1, md: 2 },
          }}
        >
          <Box sx={{ flex: { xs: "0 0 auto", md: 1 } }} />
          <Box
            component="img"
            src={LOGO_URL}
            alt="App Logo"
            onClick={() => navigate("/home")}
            sx={{
              width: { xs: 90, sm: 120, md: 140 },
              height: "auto",
              cursor: "pointer",
              position: { xs: "relative", md: "absolute" },
              left: { xs: "auto", md: "50%" },
              transform: { xs: "none", md: "translateX(-50%)" },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1.5 },
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "50px",
              px: { xs: 1, sm: 2 },
              py: 0.5,
              backgroundColor: "background.paper",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
              zIndex: 1,
            }}
          >
            <IconButton onClick={toggleMode} color="inherit">
              {mode === "dark" ? (
                <LightModeOutlinedIcon fontSize="small" />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate("/checkout")}>
              <ShoppingCartOutlinedIcon fontSize="small" />
            </IconButton>
            <Button
              variant="text"
              onClick={handleLogout}
              endIcon={<LogoutOutlinedIcon sx={{ fontSize: 18 }} />}
              sx={{
                textTransform: "none",
                color: "primary.main",
                fontWeight: 500,
                fontSize: { xs: "0.75rem", sm: "0.95rem" },
                "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
