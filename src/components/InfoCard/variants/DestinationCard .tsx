import { Box, Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import { BaseCardProps } from "../types";
import { TrendDes } from "../../../pages/Home/types";
const DestinationCard: React.FC<BaseCardProps<TrendDes>> = ({ data }) => {
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
        image={data.thumbnailUrl}
        alt={data.cityName}
        sx={{ objectFit: "cover", height: "100%" }}
        onError={(e) => {
          e.currentTarget.src = "/not-found.jpg"; // fallback image
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "background.default",
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
};

export default DestinationCard;
