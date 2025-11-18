import { CartRoomItem } from "../../../features/types";
import {
  Deal,
  RecentHotels,
  SearchRes,
  TrendDes,
} from "../../../pages/Home/types";
import { AvailbleRoom } from "../../../types";
export interface RoomCardInfo extends AvailbleRoom {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
}
export interface CartRoomItemCardIfo extends CartRoomItem {
  hotelName: string;
}
export interface BaseCardProps<T> {
  data: T;
}

export interface FeaturedDealCardProps extends BaseCardProps<Deal> {
  variant: "featuredDeals";
}

export interface RecentVisitedCardProps extends BaseCardProps<RecentHotels> {
  variant: "recentVisited";
}

export interface DestinationCardProps extends BaseCardProps<TrendDes> {
  variant: "destination";
}
export interface SearchResultCardProps extends BaseCardProps<SearchRes> {
  variant: "searchResult";
}
export interface RoomCardProps extends BaseCardProps<RoomCardInfo> {
  variant: "roomCard";
}
export interface CartItemProps extends BaseCardProps<CartRoomItemCardIfo> {
  variant: "cartItem";
}
export type InfoCardProps =
  | FeaturedDealCardProps
  | RecentVisitedCardProps
  | DestinationCardProps
  | SearchResultCardProps
  | RoomCardProps
  | CartItemProps;
