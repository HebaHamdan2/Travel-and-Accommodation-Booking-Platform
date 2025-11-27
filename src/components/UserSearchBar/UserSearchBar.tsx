import { useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ROUTES } from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchSearchSuccess,
  setSearchData,
} from "../../features/search/searchSlice";
import { useLazyGetSearchQuery } from "../../services/user/home";
import { showNotification } from "@/features/notifications/notificationsSlice";
import { getInitialSearchFromURL } from "./utils";
import { useSearchURLSync } from "./hooks/useSearchURLSync";
import { SearchParams } from "@/types";
import SearchCityField from "./components/SearchCityField";
import DateRangePickers from "./components/DateRangePickers";
import GuestSelectors from "./components/GuestSelectors";
import SearchButton from "./components/SearchButton";

const UserSearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync URL on first mount
  useEffect(() => {
    if (location.pathname === ROUTES.SEARCH_RESULTS) {
      dispatch(setSearchData(getInitialSearchFromURL()));
    }
  }, [dispatch, location.pathname]);
  useEffect(() => {
    if (location.pathname === ROUTES.SEARCH_RESULTS) {
      handleSearch();
    }
  }, [location.pathname]);
  const { updateURL } = useSearchURLSync();
  const [triggerSearch, { isLoading }] = useLazyGetSearchQuery();

  const search = useAppSelector((state) => state.search);

  const updateSearch = useCallback(
    <K extends keyof SearchParams>(key: K, value: SearchParams[K]) => {
      dispatch(setSearchData({ [key]: value })); //cache the slice
      if (location.pathname !== ROUTES.HOME) {
        //to sharable link
        updateURL({ [key]: value });
      }
    },
    [dispatch, updateURL, location.pathname]
  );

  const handleSearch = useCallback(async () => {
    try {
      const result = await triggerSearch(search).unwrap();
      dispatch(fetchSearchSuccess(result));

      navigate({
        pathname: ROUTES.SEARCH_RESULTS,
        search: `?${new URLSearchParams(search as any).toString()}`,
      });
    } catch {
      dispatch(
        showNotification({ message: "Error While Searching", type: "error" })
      );
    }
  }, [search, triggerSearch, navigate, dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 1 },
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          p: { xs: 1, sm: 0 },
        }}
      >
        <SearchCityField value={search.city || ""} update={updateSearch} />
        <DateRangePickers
          checkIn={search.checkInDate}
          checkOut={search.checkOutDate}
          update={updateSearch}
        />
        <GuestSelectors
          adults={search.adults}
          children={search.children}
          rooms={search.numberOfRooms}
          update={updateSearch}
        />
        <SearchButton loading={isLoading} onSearch={handleSearch} />
      </Box>
    </LocalizationProvider>
  );
};

export default UserSearchBar;
