import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { baseCardStyles } from "../styles/baseCardStyles";
import LocationAndRating from "../../LocationAndRating";
import { BaseCardProps } from "../types";
import { RecentHotels } from "../../../pages/Home/types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constans";

const RecentVisitedCard: React.FC<BaseCardProps<RecentHotels>> = ({ data }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`${ROUTES.HOTEL(data.hotelId)}`);
  };
  return (
    <Card sx={{ ...baseCardStyles, width: "32rem" }}>
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          component="img"
          image={data.thumbnailUrl}
          alt={data.hotelName}
          sx={{ height: 320, objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.src = "/not-found.jpg";
          }}
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

          {LocationAndRating(data.cityName, data.starRating)}

          <Stack direction="row" alignItems="baseline" mt={2} spacing={1}>
            {data.priceLowerBound && data.priceUpperBound ? (
              <>
                <Typography
                  sx={{
                    color: "secondary.main",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  ${data.priceLowerBound}
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  –
                </Typography>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    fontSize: "1.25rem",
                  }}
                >
                  ${data.priceUpperBound}
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                }}
              >
                ${data.priceUpperBound || data.priceLowerBound || "N/A"}
              </Typography>
            )}
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

export default RecentVisitedCard;
