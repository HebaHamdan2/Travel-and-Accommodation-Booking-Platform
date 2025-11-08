import { useAppSelector } from "../../../app/hooks";
import { useGetSearchQuery } from "../../../services/home";

const HotelsCards = () => {
  const { city, checkInDate, checkOutDate, adults, children, numberOfRooms } =
    useAppSelector((state) => state.search);
  const { data, isLoading, isError } = useGetSearchQuery({
    city,
    checkInDate,
    checkOutDate,
    adults,
    children,
    numberOfRooms,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching results</p>;
  return (
    <div>
      {data?.length ? (
        data.map((hotel) => (
          <div key={hotel.hotelId}>
            <h3>{hotel.hotelName}</h3>
            <p>Price: {hotel.roomPrice}</p>
          </div>
        ))
      ) : (
        <p>No hotels found</p>
      )}
    </div>
  );
};
export default HotelsCards;
