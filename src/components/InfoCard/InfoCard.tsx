import React from "react";
import FeaturedDealCard from "./variants/FeaturedDealCard";
import RecentVisitedCard from "./variants/RecentVisitedCard";
import DestinationCard from "./variants/DestinationCard ";
import { InfoCardProps } from "./types";

const InfoCard: React.FC<InfoCardProps> = ({
  variant,
  data,
}) => {
  switch (variant) {
    case "featuredDeals":
      return (
        <FeaturedDealCard data={data} />
      );
    case "recentVisited":
      return (
        <RecentVisitedCard data={data} />
      );
    case "destination":
      return <DestinationCard data={data} />;
    default:
      return null;
  }
};

export default InfoCard;
