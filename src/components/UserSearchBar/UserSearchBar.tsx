import React from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { Dayjs } from "dayjs";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  adultsOptions,
  childrenOptions,
  roomsOptions,
  ROUTES,
} from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchSearchSuccess,
  setSearchData,
} from "../../features/search/searchSlice";
import { useLazyGetSearchQuery } from "../../services/user/home";
import { ensureValidCheckOut, formatDate } from "../../utils/dateUtils";
import { SearchParams } from "../../types";
import { showNotification } from "@/features/notifications/notificationsSlice";

const UserSearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [triggerSearch, { isLoading }] = useLazyGetSearchQuery();
  const {
    city = "",
    checkInDate,
    checkOutDate,
    adults,
    children,
    numberOfRooms,
  } = useAppSelector((state) => state.search);

  const updateSearch = (key: keyof SearchParams, value: any) => {
    dispatch(setSearchData({ [key]: value })); //caching new data between my pages
    const params = new URLSearchParams({
      ...{
        city,
        checkInDate: checkInDate || "",
        checkOutDate: checkOutDate || "",
        adults: String(adults),
        children: String(children),
        numberOfRooms: String(numberOfRooms),
      },
      [key]: value, // overwrite the updated field
    });

    navigate(
      {
        pathname: ROUTES.SEARCH_RESULTS,
        search: `?${params.toString()}`,
      },
      { replace: true }
    ); // updates without refresh the page to make link sync with searchbar results and link can be shared
  };

  const handleCheckInChange = (date: Dayjs | null) => {
    if (!date) return;
    const newCheckIn = formatDate(date);
    const newCheckOut = ensureValidCheckOut(date, checkOutDate);
    updateSearch("checkInDate", newCheckIn);
    updateSearch("checkOutDate", newCheckOut);
  };
  const handleCheckOutChange = (date: Dayjs | null) => {
    if (!date) return;
    const newCheckOut = ensureValidCheckOut(checkInDate, date);
    updateSearch("checkOutDate", newCheckOut);
  };
  const handleSearch = async () => {
    const params: SearchParams = {
      city,
      checkInDate,
      checkOutDate,
      adults,
      children,
      numberOfRooms,
    };
    try {
      const result = await triggerSearch(params).unwrap();
      if (result) {
        dispatch(fetchSearchSuccess(result));
        if (location.pathname !== ROUTES.SEARCH_RESULTS) {
          navigate({
            pathname: ROUTES.SEARCH_RESULTS,
            search: `?${new URLSearchParams(params as any).toString()}`,
          });
        }
      }
    } catch (err) {
      dispatch(
        showNotification({
          message: "Error While Searching",
          type: "error",
        })
      );
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 1 },
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          p: { xs: 1, sm: 0 },
        }}
      >
        <TextField
          placeholder="Search cities..."
          value={city || ""}
          onChange={(e) => updateSearch("city", e.target.value)}
          size="small"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: "100%", sm: "auto" },
            flex: { xs: "0 0 100%", sm: 1 },
            minWidth: { xs: "100%", sm: 200 },
          }}
        />

        {/* Date Pickers */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flex: { xs: "0 0 100%", sm: "0 0 auto", md: 1 },
            minWidth: { xs: "100%", sm: 320 },
            justifyContent: "space-between",
          }}
        >
          <CustomDatePicker
            label="Check in"
            value={checkInDate ? dayjs(checkInDate) : null}
            onChange={handleCheckInChange}
            disablePast
          />
          <CustomDatePicker
            label="Check out"
            value={checkOutDate ? dayjs(checkOutDate) : null}
            onChange={handleCheckOutChange}
            minDate={checkInDate ? dayjs(checkInDate).add(1, "day") : undefined}
          />
        </Box>

        {/* Selects */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flex: { xs: "0 0 100%", sm: "0 0 auto", md: 1.5 },
            minWidth: { xs: "100%", sm: 300 },
            justifyContent: "space-between",
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel>Adults</InputLabel>
            <Select
              value={adults}
              onChange={(e) => updateSearch("adults", e.target.value)}
              label="Adults"
            >
              {adultsOptions.map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Children</InputLabel>
            <Select
              value={children}
              onChange={(e) => updateSearch("children", e.target.value)}
              label="Children"
            >
              {childrenOptions.map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Rooms</InputLabel>
            <Select
              value={numberOfRooms}
              onChange={(e) => updateSearch("numberOfRooms", e.target.value)}
              label="Rooms"
            >
              {roomsOptions.map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Search Button */}
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          disabled={isLoading}
          sx={{
            flex: { xs: "0 0 100%", sm: "0 0 auto" },
            width: { xs: "100%", sm: "auto" },
            minWidth: 120,
            backgroundColor: "primary.main",
            textTransform: "none",
            borderRadius: 1,
            height: 40,
            "&:hover": { opacity: 0.8 },
          }}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default UserSearchBar;
