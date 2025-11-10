import { Box, Grid, Skeleton, Typography } from "@mui/material";
import Wrapper from "../../../../components/Wrapper";

const TrendingDestSkeleton = () => {
  return (
    <Wrapper>
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
          <Skeleton
            variant="text"
            width="50%"
            height={48}
            sx={{ mx: "auto" }}
          />
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Grid container spacing={3} justifyContent="center" width="100%">
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 6, lg: 3 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "28rem",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={400}
                    animation="wave"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default TrendingDestSkeleton;
