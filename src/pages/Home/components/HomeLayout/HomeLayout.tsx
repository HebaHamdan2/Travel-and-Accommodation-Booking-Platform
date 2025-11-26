import Navbar from "../../../../components/Navbar";
import HomeHero from "../HomeHero";
import RecentlyVisited from "../RecentlyVisited";
import FeaturedDeals from "../FeaturedDeals";
import TrendingDest from "../TrendingDest";

const HomeLayout = () => {
  return (
    <>
      <Navbar isHome={true} />
      <HomeHero />
      <FeaturedDeals />
      <RecentlyVisited />
      <TrendingDest />
    </>
  );
};

export default HomeLayout;
