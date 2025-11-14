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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { useDebounce } from "../../../../hooks/useDebouns";
import {
  useAddCityMutation,
  useDeleteCityMutation,
  useGetCitiesQuery,
} from "../../../../services/admin/cities";

export default function ManageCities() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [newCityName, setNewCityName] = useState("");
  const [newCityDesc, setNewCityDesc] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useGetCitiesQuery({
    searchQuery: debouncedSearch,
    pageSize,
    pageNumber,
  });

  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const [deleteCity, { isLoading: isDeleting }] = useDeleteCityMutation();
  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const confirmDelete = (city: { id: number; name: string }) => {
    setCityToDelete(city);
    setDeleteDialogOpen(true);
  };

  const handleAddCity = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newCityName.trim()) return;

    try {
      await addCity({ name: newCityName, description: newCityDesc }).unwrap();
      setNewCityName("");
      setNewCityDesc("");
      setAddDialogOpen(false);
      setPageNumber(1);
      showSnackbar("City added successfully!", "success");
    } catch (error: any) {
      showSnackbar("Failed to add city.", "error");
    }
  };

  const handleConfirmDelete = async () => {
    if (!cityToDelete) return;
    try {
      await deleteCity(cityToDelete.id).unwrap();
      showSnackbar("City deleted successfully!", "success");
    } catch (error: any) {
      showSnackbar("Failed to delete city.", "error");
      console.error(error);
    } finally {
      setDeleteDialogOpen(false);
      setCityToDelete(null);
    }
  };

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
          onClick={() => setAddDialogOpen(true)}
        >
          Add City
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
                <TableRow key={city.id}>
                  <TableCell>{city.id}</TableCell>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>{city.description}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete City">
                      <IconButton
                        color="error"
                        onClick={() =>
                          confirmDelete({ id: city.id, name: city.name })
                        }
                        disabled={isDeleting}
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

      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="add-city-dialog-title"
      >
        <DialogTitle id="add-city-dialog-title">Add New City</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddCity} id="add-city-form">
            <TextField
              autoFocus
              required
              margin="dense"
              label="City Name"
              name="name"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Description"
              name="description"
              value={newCityDesc}
              onChange={(e) => setNewCityDesc(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button type="submit" form="add-city-form" disabled={isAdding}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-city-dialog-title"
        aria-describedby="delete-city-dialog-description"
      >
        <DialogTitle id="delete-city-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography id="delete-city-dialog-description">
            Are you sure you want to delete city "{cityToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
