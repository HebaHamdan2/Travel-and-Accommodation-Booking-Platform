import { Box, Button, Grid, Typography } from "@mui/material";
import Wrapper from "../../../../components/Wrapper";
import { useGetHotelReviewsQuery } from "../../../../services/hotels";
import React, { useState } from "react";
import { HotelProps } from "../../types";
import HotelReviewCard from "../HotelReviewCard";

const HotelsReviews: React.FC<HotelProps> = ({ hotelId }) => {
   const { data: reviews = [], isLoading, isError } = useGetHotelReviewsQuery(Number(hotelId));
  const [visibleCount, setVisibleCount] = useState(4);

  if (isLoading) return <Typography>Loading reviews...</Typography>;
  if (isError)
    return <Typography color="error">Failed to load reviews.</Typography>;

  const visibleReviews = reviews.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };  return (
    <>
      <Wrapper>
        <Typography
          variant="h2"
          fontWeight={600}
          fontSize="2rem"
          color="text.primary"
          mb={3}
        >
          Guest Reviews
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {visibleReviews?.map((review) => (
            <Grid
              key={review.reviewId}
              container
              sx={{ xs: 12, sm: 6, md: 4 }}
            >
              <HotelReviewCard key={review.reviewId} review={review} />
            </Grid>
          ))}
        </Grid>
          {visibleCount < reviews.length && (
        <Box textAlign="center" mt={4} alignSelf="center">
          <Button
            variant="outlined"
         
            onClick={handleLoadMore}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 4,
              py: 1,   color:"primary.main",
              fontWeight: 600,
            }}
          >
            Load More
          </Button>
        </Box>
      )}
      </Wrapper>
    </>
  );
};

export default HotelsReviews;
