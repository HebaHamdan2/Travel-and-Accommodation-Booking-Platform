import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useThemeContext } from "../../hooks/useThemeContext";
import { performLogout } from "../../features/auth/logoutHelper";
import { LOGO_URL, ROUTES } from "../../utils/constans";
import { NavbarProps } from "../../types";
const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    sections?.[0]?.id || ""
  );

  const { mode, toggleMode } = useThemeContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleScroll = (id: string) => {
    if (!sections) return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    dispatch(performLogout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <AppBar
      position={sections?.length?"sticky":"static"}
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, md: 0 },
          }}
        >
          <Box
            component="img"
            src={LOGO_URL}
            alt="App Logo"
            sx={{ width: { xs: 90, md: 140 }, cursor: "pointer" }}
            onClick={() =>
              !sections?.length
                ? navigate("/home")
                : window.scrollTo({ top: 0, behavior: "smooth" })
            }
          />

          {/* Sections (only for home) */}
          {sections && (
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
              {sections.map(({ label, id }) => (
                <Typography
                  key={id}
                  onClick={() => handleScroll(id)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: activeSection === id ? 700 : 400,
                    color:
                      activeSection === id ? "primary.main" : "text.primary",
                    transition: "color 0.3s, font-weight 0.3s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {label}
                </Typography>
              ))}
            </Box>
          )}

          {/* Right Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "50px",
              px: 2,
              py: 0.5,
              backgroundColor: "background.paper",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <IconButton onClick={toggleMode}>
              {mode === "dark" ? (
                <LightModeOutlinedIcon fontSize="small" />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/checkout")}>
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

          {/* Mobile Menu */}
          {sections && (
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Drawer for mobile sections */}
      {sections && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: { backgroundColor: "background.default", width: 240 },
          }}
        >
          <List>
            {sections.map(({ label, id }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={() => handleScroll(id)}>
                  <ListItemText
                    primary={label}
                    sx={{
                      color:
                        activeSection === id ? "primary.main" : "text.primary",
                      fontWeight: activeSection === id ? 700 : 400,
                      textAlign: "center",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
};

export default Navbar;
