import Navbar from "../../../../components/Navbar";
import { sections } from "../../constants";
import HotelCardsSkeleton from "../../skeletons/FeaturedDealsSkeleton";
import HomeHeroSkeleton from "../../skeletons/HomeHeroSkeleton";
import TrendingDestSkeleton from "../../skeletons/TrendingDestSkeleton";
import React, { Suspense } from "react";
const HomeHero = React.lazy(() => import("../HomeHero"));
const FeaturedDeals = React.lazy(() => import("../FeaturedDeals"));
const RecentlyVisited = React.lazy(() => import("../RecentlyVisited"));
const TrendingDest = React.lazy(() => import("../TrendingDest"));
const HomeLayout = () => {
  return (
    <>
      <Navbar sections={sections} />
      <Suspense fallback={<HomeHeroSkeleton />}>
        <HomeHero />
      </Suspense>
      <Suspense fallback={<HotelCardsSkeleton />}>
        <FeaturedDeals />
      </Suspense>
      <Suspense fallback={<HotelCardsSkeleton />}>
        <RecentlyVisited />
      </Suspense>
      <Suspense fallback={<TrendingDestSkeleton />}>
        <TrendingDest />
      </Suspense>
    </>
  );
};

export default HomeLayout;
