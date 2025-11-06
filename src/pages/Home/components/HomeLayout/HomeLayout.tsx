import HomeHero from "../HomeHero";
import Navbar from "../Navbar";
import FeaturedDeals from "../FeaturedDeals";
import RecentlyVisted from "../RecentlyVisted";
import TrendingDest from "../TrendingDest";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <HomeHero />
      <FeaturedDeals />
      <RecentlyVisted />
      <TrendingDest />
    </>
  );
};

export default HomeLayout;
