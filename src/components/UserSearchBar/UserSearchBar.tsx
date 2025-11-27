import { useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useLocation } from "react-router-dom";

import { ROUTES } from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import { useDebounce } from "@/hooks/useDebouns";
import { initialSearch } from "@/features/constants";

const UserSearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { updateURL } = useSearchURLSync();
  const [triggerSearch, { isLoading }] = useLazyGetSearchQuery();
  const search = useAppSelector((state) => state.search);
  const debouncedSearch = useDebounce(search, 500);

  // Sync URL on first mount
  useEffect(() => {
    if (location.pathname === ROUTES.SEARCH_RESULTS) {
      const urlSearch = getInitialSearchFromURL();
      dispatch(setSearchData(urlSearch));

      // Trigger search if URL has any parameters
      const hasParams =
        urlSearch.city ||
        urlSearch.children ||
        urlSearch.adults !== initialSearch.adults ||
        urlSearch.checkInDate !== initialSearch.checkInDate ||
        urlSearch.numberOfRooms !== initialSearch.numberOfRooms ||
        urlSearch.checkOutDate !== initialSearch.checkOutDate;
      if (hasParams) handleSearch(initialSearch);
    }
  }, [dispatch, location.pathname]);
  function updateSearch<K extends keyof SearchParams>(
    key: K,
    value: SearchParams[K]
  ) {
    const updatedSearch = { ...search, [key]: value };
    dispatch(setSearchData(updatedSearch));

    if (location.pathname !== ROUTES.HOME) {
      updateURL({ [key]: value });
    }
  }
  const handleSearch = useCallback(
    async (params: Partial<SearchParams> = search) => {
      try {
        const result = await triggerSearch(params).unwrap();
        dispatch(fetchSearchSuccess(result));

        navigate({
          pathname: ROUTES.SEARCH_RESULTS,
          search: `?${new URLSearchParams(params as any).toString()}`,
        });
      } catch {
        dispatch(
          showNotification({ message: "Error while searching", type: "error" })
        );
      }
    },
    [triggerSearch, dispatch, navigate, search]
  );

  // Trigger search automatically whenever debounced search state changes
  useEffect(() => {
    if (location.pathname === ROUTES.SEARCH_RESULTS) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch, handleSearch, location.pathname]);

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
        <SearchButton loading={isLoading} onSearch={() => handleSearch()} />
      </Box>
    </LocalizationProvider>
  );
};

export default UserSearchBar;
