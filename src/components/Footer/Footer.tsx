import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LOGO_URL } from "../../utils/constans";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        color: "text.primary",
        px: { xs: 2, sm: 6, md: 12 },
        mt:4
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="img"
            src={LOGO_URL}
            alt="Logo"
            sx={{ width: 120, height: "auto" }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            flex: 1,
          }}
        >
          &copy; {new Date().getFullYear()} Heba. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            color="inherit"
            aria-label="GitHub"
            href="https://github.com/HebaHamdan2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="LinkedIn"
            href="https://linkedin.com/in/heba-hamdan2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="Instagram"
            href="https://www.instagram.com/heba_hamdan__/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
