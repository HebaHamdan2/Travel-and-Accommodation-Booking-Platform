import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { HotelReviewProps } from "../../types";

const HotelReviewCard: React.FC<HotelReviewProps> = ({ review }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        p: 2,
        width: "32rem",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {review.customerName || "Anonymous"}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.3}>
            <StarIcon sx={{ color: "star", fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary">
              {review.rating.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1.5}
          sx={{
            fontStyle: "italic",
            wordBreak: "break-word",
            whiteSpace: "normal",
            textAlign: "left",
          }}
        >
          "{review.description}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HotelReviewCard;
