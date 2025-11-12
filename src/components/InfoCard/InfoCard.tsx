import React from "react";
import FeaturedDealCard from "./variants/FeaturedDealCard";
import RecentVisitedCard from "./variants/RecentVisitedCard";
import DestinationCard from "./variants/DestinationCard ";
import { InfoCardProps } from "./types";
import SearchResultCard from "./variants/SearchResultCard";
import RoomCard from "./variants/RoomCard";
import CartItemCard from "./variants/CartItemCard";

const InfoCard: React.FC<InfoCardProps> = ({ variant, data }) => {
  switch (variant) {
    case "featuredDeals":
      return <FeaturedDealCard data={data} />;
    case "recentVisited":
      return <RecentVisitedCard data={data} />;
    case "destination":
      return <DestinationCard data={data} />;
    case "searchResult":
      return <SearchResultCard data={data} />;
    case "roomCard":
      return <RoomCard data={data} />;
    case "cartItem":
      return <CartItemCard data={data}/>
    
  }
};

export default InfoCard;
