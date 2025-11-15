import { useState, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
  Rating,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useDebounce } from "../../../../hooks/useDebouns";
import { useGetHotelsQuery } from "../../../../services/admin/hotels";
import { useGetHotelDetailsQuery } from "../../../../services/user/hotels";
import { useGetCitiesQuery } from "../../../../services/admin/cities";
import { AdminHotel } from "../../../../types";
import AddHotelDialog from "./components/AddHotelDialog";
import UpdateHotelDialog from "./components/UpdateHotelDialog";
import DeleteHotelDialog from "./components/DeleteHotelDialog/DeleteHotelDialog";
import { HOTEL_TYPE_LABELS } from "../../../../utils/constans";

export default function ManageHotels() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [updateHotel, setUpdateHotel] = useState<AdminHotel | null>(null);
  const [deleteHotelId, setDeleteHotelId] = useState<number | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const debouncedSearch = useDebounce(search, 400);

  const { data: hotelsData = [], isLoading: hotelsLoading } = useGetHotelsQuery(
    {
      searchQuery: "",
      pageSize: 1000,
      pageNumber: 1,
    }
  );

  const { data: citiesData = [] } = useGetCitiesQuery({
    searchQuery: "",
    pageSize: 1000,
    pageNumber: 1,
  });

  const { data: hotelDetails } = useGetHotelDetailsQuery(deleteHotelId ?? 0, {
    skip: !deleteHotelId,
  });

  const filteredHotels = useMemo(() => {
    if (!debouncedSearch) return hotelsData;
    const q = debouncedSearch.toLowerCase();
    return hotelsData.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description?.toLowerCase().includes(q)
    );
  }, [hotelsData, debouncedSearch]);

  const paginatedHotels = useMemo(() => {
    const start = (pageNumber - 1) * pageSize;
    return filteredHotels.slice(start, start + pageSize);
  }, [filteredHotels, pageNumber, pageSize]);

  const hasPrev = pageNumber > 1;
  const hasNext = filteredHotels.length > pageNumber * pageSize;

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "80rem", mx: "auto" }}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "none",
        }}
      >
        <TextField
          sx={{ flex: 1, minWidth: { xs: "100%", md: "50%" } }}
          label="Search hotels by name or description"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageNumber(1);
          }}
          InputProps={{ endAdornment: <SearchIcon color="action" /> }}
        />
        <TextField
          select
          label="Limit"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNumber(1);
          }}
          sx={{ width: { xs: "100%", sm: "8rem" } }}
        >
          {[5, 10, 15, 20].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            py: "0.9rem",
            px: 3,
            fontWeight: 600,
            bgcolor: "primary.main",
          }}
          onClick={() => setAddOpen(true)}
        >
          Add Hotel
        </Button>
      </Paper>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, boxShadow: "0px 2px 8px rgba(0,0,0,0.05)" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotelsLoading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : paginatedHotels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hotels found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedHotels.map((hotel) => (
                <TableRow
                  key={hotel.id}
                  hover
                  onClick={() => setUpdateHotel(hotel)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{hotel.id}</TableCell>
                  <TableCell>{hotel.name}</TableCell>
                  <TableCell>{hotel.description}</TableCell>
                  <TableCell>{HOTEL_TYPE_LABELS[hotel.hotelType]}</TableCell>
                  <TableCell>
                    <Rating value={hotel.starRating} readOnly />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={hotel.latitude}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  {/* Longitude */}
                  <TableCell>
                    <Chip
                      label={hotel.longitude}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Delete Hotel">
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteHotelId(hotel.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          onClick={() => hasPrev && setPageNumber(pageNumber - 1)}
          sx={{ textTransform: "none", backgroundColor: "secondary.main" }}
          disabled={!hasPrev}
        >
          Prev
        </Button>
        <Typography>Page {pageNumber}</Typography>
        <Button
          variant="contained"
          onClick={() => hasNext && setPageNumber(pageNumber + 1)}
          sx={{ textTransform: "none", backgroundColor: "secondary.main" }}
          disabled={!hasNext}
        >
          Next
        </Button>
      </Stack>

      {/* Add / Update / Delete Dialogs */}
      <AddHotelDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        cities={citiesData}
        onSuccess={(msg: string) => showSnackbar(msg, "success")}
        onError={(msg) => showSnackbar(msg, "error")}
      />

      {updateHotel && (
        <UpdateHotelDialog
          open={!!updateHotel}
          onClose={() => setUpdateHotel(null)}
          hotel={updateHotel}
          onSuccess={(msg: string) => showSnackbar(msg, "success")}
          onError={(msg) => showSnackbar(msg, "error")}
        />
      )}

      {deleteHotelId !== null && hotelDetails && (
        <DeleteHotelDialog
          open={true}
          onClose={() => setDeleteHotelId(null)}
          hotelId={deleteHotelId}
          cityId={hotelDetails.cityId}
          onSuccess={(msg: string) => showSnackbar(msg, "success")}
          onError={(msg) => showSnackbar(msg, "error")}
        />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
