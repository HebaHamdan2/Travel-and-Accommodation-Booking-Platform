import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  useGetHotelsQuery,
  useGetHotelRoomsQuery,
} from "../../../../services/admin/hotels";
import { AvailbleRoom, AdminHotel, RoomBodyRequest } from "../../../../types";
import AddRoomDialog from "./components/AddRoomDialog";
import UpdateRoomDialog from "./components/UpdateRoomDialog";
import DeleteRoomDialog from "./components/DeleteRoomDialog";
import { useAddRoom } from "./hooks/useAddRoom";
import { useUpdateRoom } from "./hooks/useUpdateRoom";
import { useDeleteRoom } from "./hooks/useDeleteRoom";
import { mockHotelsData } from "@/mock/adminHotels.mock";
import AdminTableBody from "../AdminTable/AdminTableBody";

const ManageRooms: React.FC = () => {
  const { data: hotels, isError: errorHotels } = useGetHotelsQuery({});
  const safeHotels = errorHotels ? mockHotelsData : hotels ?? [];
  const defaultHotelId = safeHotels.length > 0 ? safeHotels[0].id.toString() : "";
  const [selectedHotelId, setSelectedHotelId] = useState<string>(defaultHotelId);

  const skipQuery = !selectedHotelId;
  const { data: rooms = [], isLoading } = useGetHotelRoomsQuery(
    skipQuery ? skipToken : { hotelId: Number(selectedHotelId) }
  );

  const [selectedRoom, setSelectedRoom] = useState<AvailbleRoom | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { handleAddRoom } = useAddRoom();
  const { handleUpdateRoom } = useUpdateRoom();
  const { handleDeleteRoom } = useDeleteRoom();

  const handleHotelChange = (event: SelectChangeEvent<string>) => {
    setSelectedHotelId(event.target.value);
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

  const handleConfirmDelete = async (hotelId: number, roomId: number) => {
    const success = await handleDeleteRoom(hotelId, roomId);
    return success;
  };

  const handleAddRoomSubmit = async (room: RoomBodyRequest): Promise<boolean> => {
    const success = await handleAddRoom(Number(selectedHotelId), room);
    return success;
  };

  const handleUpdateRoomSubmit = async (room: RoomBodyRequest): Promise<boolean> => {
    const success = await handleUpdateRoom(Number(selectedRoom?.roomId), room);
    return success;
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "80rem", mx: "auto" }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" mb={3}>
        <FormControl sx={{ flex: 1 }} fullWidth>
          <InputLabel>Select Hotel</InputLabel>
          <Select
            value={safeHotels.some(h => h.id.toString() === selectedHotelId) ? selectedHotelId : ""}
            onChange={handleHotelChange}
          >
            {safeHotels.map((h: AdminHotel) => (
              <MenuItem key={h.id} value={h.id.toString()}>
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
        <AdminTableBody
          variant="room"
          data={rooms}
          loading={isLoading}
          onRowClick={handleRowClick}
          onDelete={handleDeleteClick}
        />
      </Box>

      {/* Add Room Dialog */}
      {selectedHotelId && (
        <AddRoomDialog open={openAdd} onClose={() => setOpenAdd(false)} onSubmit={handleAddRoomSubmit} />
      )}

      {/* Update Room Dialog */}
      {selectedRoom && (
        <UpdateRoomDialog
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          selectedRoom={{
            roomNumber: String(selectedRoom.roomNumber),
            cost: selectedRoom.price,
          }}
          onSubmit={handleUpdateRoomSubmit}
        />
      )}

      {/* Delete Room Dialog */}
      {selectedRoom && selectedHotelId && (
        <DeleteRoomDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          hotelId={Number(selectedHotelId)}
          roomId={selectedRoom.roomId}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Box>
  );
};

export default ManageRooms;
