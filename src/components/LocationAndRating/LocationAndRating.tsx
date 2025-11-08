import { Rating, Stack, Typography } from "@mui/material";
import React from "react";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const LocationAndRating = (
  cityName: string,
  rating?: number
): React.ReactNode => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PlaceOutlinedIcon color="secondary" fontSize="small" />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "1rem", fontWeight: 500 }}
        >
          {cityName}
        </Typography>
      </Stack>
      {rating && (
        <Rating name="rating" value={rating} precision={0.5} readOnly />
      )}
    </Stack>
  );
};

export default LocationAndRating;
