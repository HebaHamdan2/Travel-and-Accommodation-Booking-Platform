import { Hotel, Review } from "../../../types";

export interface HotelDescProps {
  hotel?: Hotel;
}
export interface HotelProps {
  hotelId: number;
}
export interface AvailableRoomsProps {
  hotelId: number;
  hotelName: string;
}
export interface HotelReviewProps {
  review: Review;
}
