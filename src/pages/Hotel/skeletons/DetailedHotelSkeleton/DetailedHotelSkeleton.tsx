import { Box, Grid, Skeleton, Stack } from "@mui/material";

const DetailedHotelSkeleton = () => {
  return (
     <Box sx={{ p: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid sx={{ xs: 12, md: 6 }}>
           <Stack spacing={3} maxWidth="38rem">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={40}
              sx={{ bgcolor: "text.secondary", borderRadius: 2 }}/>
          </Stack>
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }} mt={{ xs: 2, md: "4rem" }}>
         <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ bgcolor: "text.secondary", borderRadius: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailedHotelSkeleton;
