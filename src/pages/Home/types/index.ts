import { Amenity } from "../../../types";
export interface RecentHotels {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: Date;
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}
export interface TrendDes {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}
export interface amenity extends Amenity {
  id: 0;
}
export interface Deal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}
export interface SearchRes {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: string;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: amenity[];
}
