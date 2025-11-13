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
} from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setSearchData,
  fetchSearchStart,
  fetchSearchSuccess,
  fetchSearchFailure,
} from "../../features/search/searchSlice";
import { useLazyGetSearchQuery } from "../../services/home";
const UserSearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [triggerSearch, { isLoading }] = useLazyGetSearchQuery();

  const { city, checkInDate, checkOutDate, adults, children, numberOfRooms } =
    useAppSelector((state) => state.search);
  const updateSearch = (field: string, value: any) => {
    dispatch(setSearchData({ [field]: value }));
  };
  const handleCheckInChange = (date: Dayjs | null) => {
    if (!date) return;
    updateSearch("checkInDate", date.format("YYYY-MM-DD"));
    if (date && (!checkOutDate || date.isAfter(checkOutDate))) {
      updateSearch("checkOutDate", date.add(1, "day").format("YYYY-MM-DD"));
    }
  };
  const handleCheckOutChange = (date: Dayjs | null) => {
    if (!date) return;
    if (checkInDate && date.isBefore(checkInDate)) {
      updateSearch(
        "checkOutDate",
        dayjs(checkInDate).add(1, "day").format("YYYY-MM-DD")
      );
    } else updateSearch("checkOutDate", date.format("YYYY-MM-DD"));
  };
  const handleSearch = async () => {
    try {
      dispatch(fetchSearchStart());
      const params = {
        city,
        checkInDate,
        checkOutDate,
        adults,
        children,
        numberOfRooms,
      };
      const result = await triggerSearch(params, true);
      if (result?.data) {
        dispatch(fetchSearchSuccess(result.data));
        if (location.pathname !== "/search-results") {
          navigate("/search-results");
        }
      } else {
        dispatch(fetchSearchFailure("No data returned"));
      }
    } catch (error: any) {
      dispatch(fetchSearchFailure(error?.message || "Search failed"));
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.3,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
          width: "95%",
          mx: "auto",
        }}
      >
        <TextField
          placeholder="Search cities..."
          value={city}
          onChange={(e) => updateSearch("city", e.target.value)}
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: 250,
            borderRadius: 1,
          }}
        />
        <CustomDatePicker
          label="Check in"
          value={dayjs(checkInDate)}
          onChange={handleCheckInChange}
          disablePast
        />
        <CustomDatePicker
          label="Check out"
          value={dayjs(checkOutDate)}
          onChange={handleCheckOutChange}
          minDate={dayjs(checkInDate)?.add(1, "day")}
        />
        <Box sx={{ display: "flex", gap: 1, minWidth: 240, flex: 1 }}>
          <FormControl size="small" fullWidth>
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
          <FormControl size="small" fullWidth>
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
          <FormControl size="small" fullWidth>
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
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{
            backgroundColor: "primary.main",
            textTransform: "none",
            borderRadius: 1,
            px: 3,
            height: 40,
            "&:hover": { opacity: 0.8 },
          }}
        >
          {isLoading ? "Searching..." : "Search"}{" "}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default UserSearchBar;
