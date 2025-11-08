import { ReactNode } from "react";

export interface WrapperProps {
  children: ReactNode;
  id?: string;
}
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
type amenitie = {
  id: 0;
  name: string;
  description: string;
};
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
  amenities: amenitie[];
}
// interface RoomData {
//   id: string;
//   roomType: string;
//   image: string;
//   capacityOfAdults: number;
//   capacityOfChildren: number;
//   roomAmenities: string[];
//   isInCart: boolean;
// }
type FeaturedDealCard = {
  variant: "featuredDeals";
  data: Deal;
  onActionClick?: (hotelName: string) => void;
};

type RecentVisitedCard = {
  variant: "recentVisited";
  data: RecentHotels;
  onActionClick?: (hotelName: string) => void;
};

type DestinationCard = {
  variant: "destination";
  data: TrendDes;
  onActionClick?: (cityName: string) => void;
};

export type InfoCardProps = FeaturedDealCard | RecentVisitedCard | DestinationCard;
