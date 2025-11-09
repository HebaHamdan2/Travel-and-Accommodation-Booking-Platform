import { Grid, Skeleton } from "@mui/material";
const HotelCardsSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: 10, md: 6 }}>
          <Skeleton
            key={i}
            variant="rectangular"
            height={260}
            sx={{ maxWidth: "42rem", borderRadius: "1rem" }}
          />
        </Grid>
      ))}
    </>
  );
};

export default HotelCardsSkeleton;
