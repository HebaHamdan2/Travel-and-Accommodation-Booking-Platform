import * as React from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import { useThemeContext } from "../../../../hooks/useThemeContext";
import { performLogout } from "../../../../features/auth/logoutHelper";
import { LOGO_URL } from "../../../../utils/constans";
import { useAdminNavigation } from "../../hooks/useAdminNavigation";

const drawerWidth = 250;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeContext();
  const theme = useTheme();
  const Links = useAdminNavigation();
  const currentPath = location.pathname.replace("/admin/", "");
  const match = Links.find((item) => item.path === currentPath);
  const pageTitle = currentPath === "" || currentPath === "/" ? "Dashboard" : match?.title || "Admin";

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/login");
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "95%", backgroundColor: "background.default" }}>
      <Toolbar sx={{ justifyContent: "center", mt: 1 }}>
        <img src={LOGO_URL} alt="Logo" style={{ width: 80 }} />
      </Toolbar>
      <List sx={{ flexGrow: 1, p: 1 }}>
        {Links.map(({ title, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={NavLink}
              to={`/admin/${path}`}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                "&.active": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              <ListItemText primary={title} primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
          sx={{ textTransform: "none", fontWeight: 500, borderRadius: "50px" }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: "50px",
              border: "1px solid",
              borderColor: "divider",
              cursor: "pointer",
            }}
            onClick={toggleMode}
          >
            <IconButton color="inherit" size="small">
              {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />

        {location.pathname === "/admin" && (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h5" fontWeight={600}>
              Welcome to the Admin Dashboard
            </Typography>
            <Typography sx={{ mt: 1 }}>Use the menu to manage Cities, Hotels, and Rooms.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
