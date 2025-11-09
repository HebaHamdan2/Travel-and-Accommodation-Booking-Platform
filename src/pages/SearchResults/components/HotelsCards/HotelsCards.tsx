import { Box, Container, Grid } from "@mui/material";
import { useAppSelector } from "../../../../app/hooks";
import UserSearchBar from "../../../../components/UserSearchBar";
import { useGetSearchQuery } from "../../../../services/home";
import { selectFilteredHotels } from "../../../../features/filters/selectFilteredHotels";
import FiltersSidebar from "../FiltersSidebar";
import InfoCard from "../../../../components/InfoCard";

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching results</p>;
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
              {filteredHotels?.map((hotel) => (
                <Grid key={hotel.hotelId} size={{ xs: 12, sm: 10, md: 6 }}>
                  <InfoCard variant="searchResult" data={hotel} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default HotelsCards;
