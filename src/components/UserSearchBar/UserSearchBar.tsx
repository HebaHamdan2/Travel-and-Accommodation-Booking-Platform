import { useState, useMemo } from "react";
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
const UserSearchBar: React.FC = () => {
  const today = useMemo(() => dayjs().startOf("day"), []);
  const tomorrow = useMemo(() => dayjs().add(1, "day").startOf("day"), []);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Dayjs | null>(today);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const handleCheckInChange = (date: Dayjs | null) => {
    setCheckIn(date);
    if (date && (!checkOut || date.isAfter(checkOut)))
      setCheckOut(date.add(1, "day"));
  };

  const handleCheckOutChange = (date: Dayjs | null) => {
    if (checkIn && date && date.isBefore(checkIn))
      setCheckOut(checkIn.add(1, "day"));
    else setCheckOut(date);
  };

  const handleSearch = () => {
    console.log({ location, checkIn, checkOut, adults, children, rooms });
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
          onChange={(e) => setLocation(e.target.value)}
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
              onChange={(e) => setAdults(Number(e.target.value))}
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
              onChange={(e) => setChildren(Number(e.target.value))}
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
              onChange={(e) => setRooms(Number(e.target.value))}
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
