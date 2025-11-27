import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import Wrapper from "../../../../components/Wrapper";

const HotelCardsSkeleton = () => {
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
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 6, lg: 4 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    maxWidth: "32rem",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={320}
                    width="32rem"
                    animation="wave"
                  />

                  <Stack spacing={1} sx={{ p: 2 }}>
                    <Skeleton variant="text" height={32} width="70%" />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="text" height={20} width="40%" />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="baseline"
                      mt={1}
                    >
                      <Skeleton variant="text" height={28} width="30%" />
                      <Skeleton variant="text" height={28} width="40%" />
                    </Stack>
                    <Skeleton
                      variant="rectangular"
                      height={40}
                      sx={{ borderRadius: "1rem", mt: 2 }}
                    />
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default HotelCardsSkeleton;
