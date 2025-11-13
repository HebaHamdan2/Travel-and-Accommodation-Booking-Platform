import { Box, Grid, Typography } from "@mui/material";
import Wrapper from "../../../../components/Wrapper/index.ts";
import InofCard from "../../../../components/InfoCard/InfoCard.tsx";
import HotelCardsSkeleton from "../../skeletons/FeaturedDealsSkeleton/HotelCardsSkeleton.tsx";
import { useGetFeaturedDealsQuery } from "../../../../services/user/home.ts";

const FeaturedDeals = () => {
  const { data: deals, isLoading, isError, error } = useGetFeaturedDealsQuery();
  if (isLoading) return <HotelCardsSkeleton />;
  if (isError) return <Typography color="error">{String(error)}</Typography>;

  return (
    <Wrapper id="featured">
      <Box
        sx={{
          textAlign: "center",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            my: { xs: "2rem", md: "4rem" },
          }}
        >
          Featured Deals
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            {deals?.slice(0, 3).map((deal) => (
              <Grid key={deal.hotelId} size={{ xs: 12, md: 6, lg: 4 }}>
                <InofCard variant="featuredDeals" data={deal} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default FeaturedDeals;
