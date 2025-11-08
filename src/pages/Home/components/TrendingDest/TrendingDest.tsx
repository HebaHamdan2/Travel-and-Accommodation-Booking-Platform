import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import Wrapper from "../Wrapper";
import { useGetTrendingDestQuery } from "../../../../services/home";
import InofCard from "../../../../components/InfoCard";

const TrendingDest = () => {
  const { data: trends, isLoading, isError, error } = useGetTrendingDestQuery();
  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{String(error)}</Typography>;
  return (
    <Wrapper id="trending">
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
          Trending Destination
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
            {trends?.slice(0, 4).map((trend) => (
              <Grid key={trend.cityId} size={{ xs: 12, md: 6, lg: 3 }}>
                <InofCard
                  variant="destination"
                  data={trend}
                  onActionClick={() => alert("trending Dest")}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default TrendingDest;
