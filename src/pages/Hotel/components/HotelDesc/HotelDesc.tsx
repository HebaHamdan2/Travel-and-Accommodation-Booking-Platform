import { Box, Chip, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import { HotelDescProps } from "../../types";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const HotelDesc: React.FC<HotelDescProps> = ({ hotel }) => {
  if (!hotel) return null;
  return (
    <>
      <Typography variant="h1" fontWeight={600} fontSize="2.5rem">
        {hotel.hotelName}
      </Typography>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PlaceOutlinedIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: "1rem", fontWeight: 600 }}
        >
          {hotel.location}
        </Typography>
      </Stack>
      <Box
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: "background.default",
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          position: "relative",
          backgroundColor: "background.paper",
          textAlign: "left",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            px: 1.2,
            py: 0.4,
          }}
        >
          <StarIcon sx={{ color: "star" }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "text.primary",
            }}
          >
            {hotel.starRating}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          fontSize="1rem"
          textAlign="left"
          fontWeight={400}
          color="text.primary"
          mt="1.5rem"
        >
          {hotel.description}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
          {hotel.amenities?.map((item) => (
            <Chip
              key={item.name}
              label={item.name}
              variant="filled"
              sx={{
                backgroundColor: "secondary.main",
                color: "background.default",
                opacity: 0.7,
              }}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default HotelDesc;
