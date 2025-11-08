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
import { Dayjs } from "dayjs";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  adultsOptions,
  childrenOptions,
  roomsOptions,
} from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { setSearchData } from "../../features/search/searchSlice";
const UserSearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { location, checkIn, checkOut, adults, children, rooms } =
    useAppSelector((state) => state.search);

  const handleSearch = () => {
    navigate("/search-results");
  };

  const updateSearch = (field: string, value: any) => {
    dispatch(setSearchData({ [field]: value }));
  };
  const handleCheckInChange = (date: Dayjs | null) => {
    updateSearch("checkIn", date);
    if (date && (!checkOut || date.isAfter(checkOut))) {
      updateSearch("checkOut", date.add(1, "day"));
    }
  };

  const handleCheckOutChange = (date: Dayjs | null) => {
    if (checkIn && date && date.isBefore(checkIn)) {
      updateSearch("checkOut", checkIn.add(1, "day"));
    } else updateSearch("checkOut", date);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
          width: "75%",
          mx: "auto",
        }}
      >
        <TextField
          placeholder="Search hotels, cities..."
          value={location}
          onChange={(e) => updateSearch("location", e.target.value)}
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
          value={checkIn}
          onChange={handleCheckInChange}
          disablePast
        />
        <CustomDatePicker
          label="Check out"
          value={checkOut}
          onChange={handleCheckOutChange}
          minDate={checkIn?.add(1, "day")}
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
              value={rooms}
              onChange={(e) => updateSearch("rooms", e.target.value)}
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
          Search
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default UserSearchBar;
