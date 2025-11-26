import { Box, Container, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import UserSearchBar from "../../../../components/UserSearchBar";
import { selectFilteredHotels } from "../../../../features/filters/selectFilteredHotels";
import FiltersSidebar from "../FiltersSidebar";
import HotelCardsSkeleton from "../../skeletons/HotelCardsSkeleton";
import { useGetSearchQuery } from "../../../../services/user/home";
import SearchResultCard from "@/components/Cards/SearchResultCard";

const HotelsCards = () => {
  const { city, checkInDate, checkOutDate, adults, children, numberOfRooms } =
    useAppSelector((state) => state.search);
  const { isLoading, isError } = useGetSearchQuery({
    city,
    checkInDate,
    checkOutDate,
    adults,
    children,
    numberOfRooms,
  });
  const filteredHotels = useAppSelector(selectFilteredHotels);

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: "4rem" }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <FiltersSidebar />
          </Grid>
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Box sx={{ mb: 3 }}>
              <UserSearchBar />
            </Box>
            <Grid container spacing={3} justifyContent="center">
              {isLoading ? (
                <HotelCardsSkeleton />
              ) : isError ? (
                <Typography
                  variant="h6"
                  color="error"
                  textAlign="center"
                  sx={{ mt: 4 }}
                >
                  Something went wrong while fetching results. Please try again.
                </Typography>
              ) : !filteredHotels?.length ? (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 8,
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="h5" fontWeight={500}>
                    No hotels found
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Oops! We couldn’t find any hotels. Try changing your filters
                    or search to see more options!
                  </Typography>
                </Box>
              ) : (
                filteredHotels?.map((hotel) => (
                  <Grid key={hotel.hotelId} size={{ xs: 12, sm: 10, md: 6 }}>
                    <SearchResultCard data={hotel} />
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default HotelsCards;
