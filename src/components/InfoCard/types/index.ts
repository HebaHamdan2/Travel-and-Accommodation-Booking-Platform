import { Deal, RecentHotels, TrendDes } from "../../../pages/Home/types";
 
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

export type InfoCardProps =
  | FeaturedDealCardProps
  | RecentVisitedCardProps
  | DestinationCardProps;
