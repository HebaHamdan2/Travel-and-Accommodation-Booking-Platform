import { Box, Grid, Typography } from "@mui/material";
import Wrapper from "../../../../components/Wrapper/index.ts";
import { getDecodedToken } from "../../../../utils/getDecodedToken.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import InofCard from "../../../../components/InfoCard/index.ts";
import HotelCardsSkeleton from "../../skeletons/FeaturedDealsSkeleton/HotelCardsSkeleton.tsx";
import { useGetRecentlyVisitedQuery } from "../../../../services/user/home.ts";

const RecentlyVisited = () => {
  const { authentication } = useAppSelector((state) => state.auth);
  const userId = getDecodedToken(authentication || "")?.user_id ?? null;
  const {
    data: recentVisited,
    isLoading,
    isError,
    error,
  } = useGetRecentlyVisitedQuery(userId as string, {
    skip: !userId, // prevents the API call until a valid userId exists
  });
  if (isLoading) return <HotelCardsSkeleton />;
  if (isError) return <Typography color="error">{String(error)}</Typography>;

  return (
    <Wrapper id="recent">
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
          Recently Visted Hotels
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
            {recentVisited?.slice(0, 3).map((hotel) => (
              <Grid key={hotel.hotelId} size={{ xs: 12, md: 6, lg: 4 }}>
                <InofCard variant="recentVisited" data={hotel} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default RecentlyVisited;
