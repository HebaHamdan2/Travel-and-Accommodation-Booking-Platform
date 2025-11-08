import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import React from "react";
import { InfoCardProps } from "../../pages/Home/types";
import { Box, Rating, Stack } from "@mui/material";

const InofCard: React.FC<InfoCardProps> = ({
  variant,
  data,
  onActionClick = () => {},
}) => {
  switch (variant) {
    case "featuredDeals":
      const deal = data;
      return (
        <Card
          sx={{
            maxWidth: "32rem",
            borderRadius: "1rem",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={deal.roomPhotoUrl}
              alt={deal.hotelName}
              sx={{
                height: "20rem",
                objectFit: "cover",
              }}
            />

            <CardContent sx={{ px: 3, pb: 2 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {deal.hotelName}
              </Typography>

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
                    {deal.cityName}
                  </Typography>
                </Stack>

                <Rating
                  name="half-rating-read"
                  defaultValue={deal.hotelStarRating}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="baseline"
                mt={2}
                sx={{ flexWrap: "wrap" }}
              >
                {deal.originalRoomPrice && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "line-through",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    ${deal.originalRoomPrice}
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
                  ${deal.finalPrice}
                  <Typography
                    component="span"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.95rem",
                      fontWeight: 700,
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
                  opacity: 0.8,
                  transform: "scale(1.02)",
                },
                transition: "all 0.2s ease-in-out",
              }}
              onClick={() => onActionClick?.(deal.hotelName)}
            >
              View Details
            </Button>
          </CardActions>
        </Card>
      );
    case "recentVisited":
      const recent = data;
      return (
        <Card
          sx={{
            maxWidth: "32rem",
            borderRadius: "1rem",
            boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={recent.thumbnailUrl}
              alt={recent.hotelName}
              sx={{
                height: "20rem",
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ px: 3, pb: 2 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                {recent.hotelName}
              </Typography>

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
                    {recent.cityName}
                  </Typography>
                </Stack>

                <Rating
                  name="half-rating-read"
                  defaultValue={recent.starRating}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="baseline"
                mt={2}
                sx={{ flexWrap: "wrap" }}
              >
                {recent.priceLowerBound && recent.priceUpperBound ? (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "secondary.main",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      ${recent.priceLowerBound}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      –
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                      }}
                    >
                      ${recent.priceUpperBound}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "primary.main",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                    }}
                  >
                    ${recent.priceUpperBound || recent.priceLowerBound}
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
                  opacity: 0.8,
                  transform: "scale(1.02)",
                },
                transition: "all 0.2s ease-in-out",
              }}
              onClick={() => onActionClick?.(recent.hotelName)}
            >
              View Details
            </Button>
          </CardActions>
        </Card>
      );
    case "destination":
      const dest = data;
      return (
        <Card
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            height: 400,
          }}
        >
          <CardMedia
            component="img"
            height="400rem"
            image={dest.thumbnailUrl}
            alt={data.cityName}
            sx={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              textShadow: "0 1px 3px rgba(0,0,0,0.7)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {data.cityName}
            </Typography>
          </Box>
        </Card>
      );
  }
};
export default InofCard;
