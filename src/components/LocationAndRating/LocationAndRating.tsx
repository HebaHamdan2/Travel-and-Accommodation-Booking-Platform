import { Rating, Stack, Typography } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const LocationAndRating = (cityName: string, rating?: number) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <PlaceOutlinedIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "1rem", fontWeight: 500 }}
        >
          {cityName}
        </Typography>
      </Stack>
      {rating && (
        <Rating
          name="rating"
          value={rating}
          precision={0.5}
          readOnly
          sx={{ color: "star" }}
        />
      )}
    </Stack>
  );
};

export default LocationAndRating;
