import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { useAppDispatch } from "../../../../app/hooks";
import { logout } from "../../../../features/auth/authSlice";
import { sections } from "../../constants";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleMode } = useThemeContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDrawerOpen(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component="img"
            src="/Logo.svg"
            alt="Travel Logo"
            sx={{
              width: { xs: 120, md: 140 },
              height: "auto",
              cursor: "pointer",
            }}
          />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
            {sections.map(({ label, id }) => (
              <Typography
                key={id}
                variant="body1"
                onClick={() => handleScroll(id)}
                sx={{
                  cursor: "pointer",
                  fontWeight: 400,
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.3s",
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              border: "1px solid",
              borderColor: "background.paper",
              borderRadius: "50px",
              px: 2,
              py: 0.5,
              backgroundColor: "transparent",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
            }}
          >
            <IconButton onClick={toggleMode}>
              {mode === "dark" ? (
                <LightModeOutlinedIcon fontSize="small" />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>

            <IconButton>
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
                fontSize: "0.95rem",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.6,
                },
              }}
            >
              Logout
            </Button>
          </Box>

          {/* Hamburger for Mobile */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "background.default",
            width: 240,
          },
        }}
      >
        <List>
          {sections.map(({ label, id }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={() => handleScroll(id)}>
                <ListItemText
                  primary={label}
                  sx={{
                    color: "text.primary",
                    textAlign: "center",
                    "&:hover": { color: "primary.main" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
