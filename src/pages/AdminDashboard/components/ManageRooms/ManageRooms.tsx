import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { SelectChangeEvent } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query/react";

import {
  useGetHotelsQuery,
  useGetHotelRoomsQuery,
  useAddHotelRoomMutation,
  useDeleteHotelRoomMutation,
} from "../../../../services/admin/hotels";
import { AvailbleRoom, AdminHotel, RoomBodyRequest } from "../../../../types";

import AddRoomDialog from "./components/AddRoomDialog";
import UpdateRoomDialog from "./components/UpdateRoomDialog";
import DeleteRoomDialog from "./components/DeleteRoomDialog";
import { useUpdateRoomMutation } from "../../../../services/admin/rooms";

const ManageRooms: React.FC = () => {
  const { data: hotels = [] } = useGetHotelsQuery({});
  const [selectedHotelId, setSelectedHotelId] = useState<number | "">("");
  const { data: rooms = [], refetch } = useGetHotelRoomsQuery(
    selectedHotelId ? { hotelId: selectedHotelId } : skipToken,
    { skip: !selectedHotelId }
  );

  const [selectedRoom, setSelectedRoom] = useState<AvailbleRoom | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [addRoom] = useAddHotelRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteHotelRoomMutation();

  const handleHotelChange = (event: SelectChangeEvent<number>) => {
    setSelectedHotelId(Number(event.target.value));
    setSelectedRoom(null);
  };

  const handleRowClick = (room: AvailbleRoom) => {
    setSelectedRoom(room);
    setOpenUpdate(true);
  };

  const handleDeleteClick = (room: AvailbleRoom) => {
    setSelectedRoom(room);
    setOpenDelete(true);
  };
  useEffect(() => {
    if (hotels.length && selectedHotelId === "") {
      setSelectedHotelId(hotels[0].id);
    }
  }, [hotels, selectedHotelId]);

  return (
    <Box p={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Select Hotel</InputLabel>
          <Select value={selectedHotelId} onChange={handleHotelChange}>
            {hotels.map((h: AdminHotel) => (
              <MenuItem key={h.id} value={h.id}>
                {h.name}
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
          disabled={!selectedHotelId}
        >
          Add Room
        </Button>
      </Stack>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room ID</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Room Type</TableCell>
                <TableCell>Adults Capacity</TableCell>
                <TableCell>Children Capacity</TableCell>
                <TableCell>Amenities</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow
                  key={room.roomId}
                  hover
                  selected={selectedRoom?.roomId === room.roomId}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(room)}
                >
                  <TableCell>{room.roomId}</TableCell>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.capacityOfAdults}</TableCell>
                  <TableCell>{room.capacityOfChildren}</TableCell>
                  <TableCell>
                    {room.roomAmenities.map((a) => a.name).join(", ")}
                  </TableCell>
                  <TableCell>{room.price}</TableCell>
                  <TableCell>
                    {room.availability ? "Available" : "Not Available"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(room);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add Room Dialog */}
      {selectedHotelId && (
        <AddRoomDialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onSubmit={async (room: RoomBodyRequest) => {
            try {
              await addRoom({
                room: { ...room },
                hotelId: selectedHotelId,
              }).unwrap();
              refetch();
              return true;
            } catch (err: any) {
              return false;
            }
          }}
        />
      )}
      {selectedRoom && (
        <UpdateRoomDialog
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          selectedRoom={{
            roomNumber: String(selectedRoom.roomNumber),
            cost: selectedRoom.price,
          }}
          onSubmit={async (room: RoomBodyRequest) => {
            try {
              await updateRoom({
                roomId: selectedRoom.roomId,
                room,
              }).unwrap();
              refetch();
              return true;
            } catch (err: any) {
              return false;
            }
          }}
        />
      )}

      {/* Delete Room Dialog */}
      {selectedRoom && selectedHotelId && (
        <DeleteRoomDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          hotelId={selectedHotelId}
          roomId={selectedRoom.roomId}
          onSuccess={async () => {
            await deleteRoom({
              hotelId: selectedHotelId,
              roomId: selectedRoom.roomId,
            }).unwrap();
            refetch();
          }}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageRooms;
