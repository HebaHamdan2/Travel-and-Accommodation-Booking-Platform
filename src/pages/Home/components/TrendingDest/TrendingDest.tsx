import { Box, Grid, Typography } from "@mui/material";
import CustomCard from "../../../../components/CustomCard";
import Wrapper from "../Wrapper";

const TrendingDest = () => {
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
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomCard />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomCard />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomCard />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
              <CustomCard />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default TrendingDest;
