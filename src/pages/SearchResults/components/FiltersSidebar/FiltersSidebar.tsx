import { Box, Drawer, IconButton } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import FiltersList from "./FiltersList.tsx";
const FiltersSidebar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "1rem",
          overflow: "hidden",
          display: { xs: "none", md: "block" },
          height: "100%",
          flexShrink: 0,
          maxWidth: "25rem",
        }}
      >
        <FiltersList />
      </Box>
      {!drawerOpen && (
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            top: "20%",
            left: "1%",
            zIndex: 1300,
            backgroundColor: "background.paper",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <FilterAltOutlinedIcon />
        </IconButton>
      )}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "background.paper", width: 280 },
        }}
      >
        <FiltersList />
      </Drawer>
    </>
  );
};

export default FiltersSidebar;
