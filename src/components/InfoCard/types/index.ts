import {
  Deal,
  RecentHotels,
  SearchRes,
  TrendDes,
} from "../../../pages/Home/types";
import { AvailbleRoom } from "../../../types";

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
export interface RoomCardProps extends BaseCardProps<AvailbleRoom> {
  variant: "roomCard";
}
export type InfoCardProps =
  | FeaturedDealCardProps
  | RecentVisitedCardProps
  | DestinationCardProps
  | SearchResultCardProps
  | RoomCardProps;
