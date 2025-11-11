import { useParams } from "react-router-dom";
import Navbar from "../../../../components/Navbar";
import DetailedHotelInfo from "../DetailedHotelInfo";
import HotelsReviews from "../HotelReviews";
import AvailableRooms from "../AvailableRooms";
const HotelLayout = () => {
  let params = useParams();
  const hotelId = Number(params.hotelId);
  return (
    <>
      <Navbar />
      <DetailedHotelInfo hotelId={hotelId} />
      <HotelsReviews hotelId={hotelId} />
      <AvailableRooms hotelId={hotelId} />
    </>
  );
};

export default HotelLayout;
