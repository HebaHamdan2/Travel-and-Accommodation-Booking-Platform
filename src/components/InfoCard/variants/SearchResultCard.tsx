import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import React from "react";
import { BaseCardProps } from "../types";
import { SearchRes } from "../../../pages/Home/types";
import { useNavigate } from "react-router-dom";
import { baseCardStyles } from "../styles/baseCardStyles";
const SearchResultCard: React.FC<BaseCardProps<SearchRes>> = ({ data }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/hotels/${data.hotelId}`);
  };
  return (
    <Card sx={{ ...baseCardStyles, maxWidth: "42rem" }}>
      <CardActionArea onClick={handleNavigate}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={data.roomPhotoUrl}
            alt={data.hotelName}
            sx={{ height: 320, objectFit: "cover" }}
          />
          {data.starRating && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "background.default",
                px: 1.2,
                py: 0.4,
                borderRadius: "1rem",
                boxShadow: 1,
              }}
            >
              <StarIcon sx={{ color: "star", fontSize: "1.2rem" }} />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "text.primary",
                }}
              >
                {data.starRating.toFixed(2)}
              </Typography>
            </Stack>
          )}
        </Box>
        <CardContent sx={{ px: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "2.25rem",
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {data.hotelName}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
            {data.amenities?.map((item) => (
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PlaceOutlinedIcon
                sx={{ color: "text.secondary", fontSize: "1rem" }}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1rem", fontWeight: 500 }}
              >
                {data.cityName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="baseline" spacing={1}>
              {data.discount && (
                <Typography
                  sx={{
                    color: "text.secondary",
                    textDecoration: "line-through",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  ${Number(data.roomPrice).toFixed(2)}
                </Typography>
              )}
              <Typography
                variant="h6"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                $
                {(
                  Number(data.roomPrice) -
                  Number(data.roomPrice) * Number(data.discount)
                ).toFixed(2)}
                <Typography
                  component="span"
                  sx={{
                    color: "secondary.main",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    ml: 0.5,
                  }}
                >
                  per night
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          size="medium"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            borderRadius: "1rem",
            px: 4,
            backgroundColor: "main.main",
            color: "background.paper",
            "&:hover": {
              opacity: 0.9,
              transform: "scale(1.02)",
            },
            transition: "all 0.2s ease-in-out",
          }}
          onClick={handleNavigate}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchResultCard;
