import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { BaseCardProps } from "./types";
import { Deal } from "@/pages/Home/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/utils/constans";
import { baseCardStyles } from "./styles/baseCardStyles";
import LocationAndRating from "../LocationAndRating";
const FeaturedDealCard: React.FC<BaseCardProps<Deal>> = ({ data }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`${ROUTES.HOTEL(data.hotelId)}`);
  };
  return (
    <Card sx={{ ...baseCardStyles, width: "32rem" }}>
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          component="img"
          image={data.roomPhotoUrl}
          alt={data.hotelName}
          sx={{ height: 320, objectFit: "cover" }}
        />
        <CardContent sx={{ px: 3, pb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {data.hotelName}
          </Typography>

          {LocationAndRating(data.cityName, data.hotelStarRating)}
          <Stack direction="row" alignItems="baseline" mt={2} spacing={1}>
            {data.originalRoomPrice && (
              <Typography
                sx={{
                  color: "text.secondary",
                  textDecoration: "line-through",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                ${data.originalRoomPrice}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "1.4rem",
              }}
            >
              ${data.finalPrice}
              <Typography
                component="span"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  ml: 0.5,
                }}
              >
                per night
              </Typography>
            </Typography>
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
            backgroundColor: "secondary.main",
            color: "text.primary",
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

export default FeaturedDealCard;
