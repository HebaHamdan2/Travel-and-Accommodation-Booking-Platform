import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import CustomCard from "../../../../components/CustomCard";
import Wrapper from "../Wrapper";
import { useGetFeaturedDealsQuery } from "../../../../services/home.ts";

const FeaturedDeals = () => {
  const { data: deals, isLoading, isError, error } = useGetFeaturedDealsQuery();
  if (isLoading) return <CircularProgress />;
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
            {deals?.map((deal) => (
              <Grid key={deal.hotelId} size={{ xs: 12, md: 6, lg: 4 }}>
                {/* <CustomCard {...deal} /> */}
                <CustomCard />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default FeaturedDeals;
