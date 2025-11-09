import React, { lazy, Suspense } from "react";
const HotelsCards = lazy(() => import("../HotelsCards"));
import Navbar from "../../../../components/Navbar";
import SearchResultsSkeleton from "../../skeletons/SearchResultsSkeleton";
const SearchResultLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<SearchResultsSkeleton />}>
        <HotelsCards />
      </Suspense>
    </>
  );
};

export default SearchResultLayout;
