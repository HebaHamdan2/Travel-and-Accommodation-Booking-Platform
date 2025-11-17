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
import { useGetCitiesQuery } from "../../../../services/admin/cities";
import { useDeleteCity } from "./hooks/useDeleteCity";
import { useAddCity } from "./hooks/useAddCity";
import { useUpdateCity } from "./hooks/useUpdateCity";

export default function ManageCities() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [newCityName, setNewCityName] = useState("");
  const [newCityDesc, setNewCityDesc] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const {
    open: updateOpen,
    setOpen: setUpdateOpen,
    cityToUpdate,
    handleOpen: handleUpdateOpen,
    handleUpdate,
    isUpdating,
  } = useUpdateCity();
  const {
    open: addOpen,
    setOpen: setAddOpen,
    handleAddCity,
    isAdding,
  } = useAddCity();
  const {
    open: deleteOpen,
    setOpen: setDeleteOpen,
    cityToDelete,
    confirmDelete,
    handleConfirmDelete,
    isDeleting,
  } = useDeleteCity();

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

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
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
          onClick={() => setAddOpen(true)}
        >
          Add City
        </Button>
      </Paper>
      <Box sx={{ overflowX: "auto" }}>
        {" "}
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
                    onClick={() => {
                      handleUpdateOpen(city);
                      setUpdateName(city.name);
                      setUpdateDesc(city.description);
                    }}
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
                            confirmDelete({ id: city.id, name: city.name }, e);
                          }}
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
      <Dialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="add-city-dialog-title"
      >
        <DialogTitle id="add-city-dialog-title">Add New City</DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) =>
              handleAddCity(
                e,
                newCityName,
                newCityDesc,
                showSnackbar,
                () => {
                  setNewCityName("");
                  setNewCityDesc("");
                },
                () => setPageNumber(1)
              )
            }
            id="add-city-form"
          >
            <TextField
              autoFocus
              required
              margin="dense"
              label="City Name"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Description"
              required
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
          <Button onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button type="submit" form="add-city-form" disabled={isAdding}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
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
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button
            onClick={() => handleConfirmDelete(showSnackbar)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="update-city-dialog-title"
      >
        <DialogTitle id="update-city-dialog-title">
          Update City: {cityToUpdate?.name}
        </DialogTitle>
        <DialogContent>
          <form
            id="update-city-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(updateName, updateDesc, showSnackbar);
            }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              label="City Name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              required
              label="Description"
              value={updateDesc}
              onChange={(e) => setUpdateDesc(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateOpen(false)}>Cancel</Button>
          <Button type="submit" form="update-city-form" disabled={isUpdating}>
            Update
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
