import { useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../../../hooks/useDebouns";
import { useGetCitiesQuery } from "../../../../services/admin/cities";
import { useDeleteCity } from "./hooks/useDeleteCity";
import { useAddCity } from "./hooks/useAddCity";
import { useUpdateCity } from "./hooks/useUpdateCity";
import AddCityDialog from "./components/AddCityDialog";
import DeleteCityDialog from "./components/DeleteCityDialog";
import { City } from "@/types";
import UpdateCityDialog from "./components/UpdateCityDialog";

export default function ManageCities() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City>({
    id: 0,
    name: "",
    description: "",
  });

  const { handleUpdate } = useUpdateCity();
  const { handleAddCity } = useAddCity();
  const { handleConfirmDelete } = useDeleteCity();
  const handleDeleteClick = (city: {
    id: number;
    name: string;
    description: string;
  }) => {
    setSelectedCity(city);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    if (!selectedCity) return;
    const success = await handleConfirmDelete(
      selectedCity.id,
      selectedCity.name
    );
    if (success) {
      setOpenDelete(false);
    }
  };
  const handleRowClick = (city: City) => {
    setSelectedCity(city);
    setOpenUpdate(true);
  };
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useGetCitiesQuery({
    searchQuery: debouncedSearch,
    pageSize,
    pageNumber,
  });
  const cities = data ?? [];
  const hasPrev = pageNumber > 1;
  const hasNext = cities.length === pageSize;

  const handlePrev = () => hasPrev && setPageNumber(pageNumber - 1);
  const handleNext = () => hasNext && setPageNumber(pageNumber + 1);

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
          label="Search cities by name or description"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageNumber(1);
          }}
          InputProps={{ endAdornment: <SearchIcon color="action" /> }}
        />
        <FormControl sx={{ width: { xs: "100%", sm: "8rem" } }}>
          <InputLabel id="limit-select-label">Limit</InputLabel>
          <Select
            labelId="limit-select-label"
            id="limit-select"
            value={pageSize}
            label="Limit"
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNumber(1);
            }}
          >
            {[5, 10, 15, 20].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onClick={() => setOpenAdd(true)}
        >
          Add City
        </Button>
      </Paper>
      <Box sx={{ overflowX: "auto" }}>
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
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : cities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No cities found.
                  </TableCell>
                </TableRow>
              ) : (
                cities.map((city) => (
                  <TableRow
                    key={city.id}
                    hover
                    onClick={() => handleRowClick(city)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{city.id}</TableCell>
                    <TableCell>{city.name}</TableCell>
                    <TableCell>{city.description}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Delete City">
                        <IconButton
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick({
                              id: city.id,
                              name: city.name,
                              description: city.description,
                            });
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
      </Box>
      {/* Pagination */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          onClick={handlePrev}
          sx={{ textTransform: "none", backgroundColor: "secondary.main" }}
          disabled={!hasPrev}
        >
          Prev
        </Button>
        <Typography>Page {pageNumber}</Typography>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ textTransform: "none", backgroundColor: "secondary.main" }}
          disabled={!hasNext}
        >
          Next
        </Button>
      </Stack>
      {/* CRUD City Dialogs -Read  */}
      <AddCityDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={async (name, description, resetForm) => {
          const result = await handleAddCity(name, description, resetForm, () =>
            setPageNumber(1)
          );
          const success = result ?? false;
          return success;
        }}
      />
      <DeleteCityDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        cityId={selectedCity?.id}
        cityName={selectedCity?.name}
        onConfirm={confirmDelete}
      />
      <UpdateCityDialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        selectedCity={{
          id: selectedCity.id,
          name: selectedCity.name,
          description: selectedCity.description,
        }}
        onSubmit={async (city: Omit<City, "id">) => {
          const success = await handleUpdate(
            selectedCity.id,
            city.name,
            city.description
          );
          return success;
        }}
      />
    </Box>
  );
}
