import React, { useMemo, useState } from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  useGetHotelsQuery,
  useGetHotelRoomsQuery,
} from "../../../../services/admin/hotels";
import { AvailbleRoom, RoomBodyRequest } from "../../../../types";
import AddRoomDialog from "./components/AddRoomDialog";
import UpdateRoomDialog from "./components/UpdateRoomDialog";
import DeleteRoomDialog from "./components/DeleteRoomDialog";
import { useAddRoom } from "./hooks/useAddRoom";
import { useUpdateRoom } from "./hooks/useUpdateRoom";
import { useDeleteRoom } from "./hooks/useDeleteRoom";
import { mockHotelsData } from "@/mock/adminHotels.mock";
import { useAdminTable } from "../../hooks/useAdminTable";
import AdminManageTable from "../AdminManageTable";

const ManageRooms: React.FC = () => {
  const table = useAdminTable<AvailbleRoom>();
  const { handleAddRoom } = useAddRoom();
  const { handleUpdateRoom } = useUpdateRoom();
  const { handleDeleteRoom } = useDeleteRoom();

  const { data: hotels, isError } = useGetHotelsQuery({});
  const safeHotels = isError ? mockHotelsData : hotels ?? [];

  const defaultHotelId =
    safeHotels.length > 0 ? safeHotels[0].id.toString() : "";
  const [selectedHotelId, setSelectedHotelId] =
    useState<string>(defaultHotelId);

  const skipQuery = !selectedHotelId;
  const { data: rooms = [], isLoading } = useGetHotelRoomsQuery(
    skipQuery ? skipToken : { hotelId: Number(selectedHotelId) }
  );

  const filteredRooms = useMemo(() => {
    if (!table.debouncedSearch) return rooms;
    const q = table.debouncedSearch.toLowerCase();
    return rooms.filter(
      (r) =>
        r.roomNumber.toString().includes(q) || r.price?.toString().includes(q)
    );
  }, [rooms, table.debouncedSearch]);

  const paginatedRooms = useMemo(() => {
    const start = (table.pageNumber - 1) * table.pageSize;
    return filteredRooms.slice(start, start + table.pageSize);
  }, [filteredRooms, table.pageNumber, table.pageSize]);

  const handleAddRoomSubmit = async (room: RoomBodyRequest) => {
    const success = await handleAddRoom(Number(selectedHotelId), room);
    if (success) table.setOpenAdd(false);
    return success;
  };

  const handleUpdateRoomSubmit = async (room: RoomBodyRequest) => {
    if (!table.selectedItem) return false;
    const success = await handleUpdateRoom(table.selectedItem.roomId, room);
    if (success) table.setOpenUpdate(false);
    return success;
  };

  const handleDeleteRoomSubmit = async () => {
    if (!table.selectedItem) return;
    const success = await handleDeleteRoom(
      Number(selectedHotelId),
      table.selectedItem.roomId
    );
    if (success) table.setOpenDelete(false);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "80rem", mx: "auto" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        mb={3}
      >
        <FormControl sx={{ flex: 1 }} fullWidth>
          <InputLabel>Select Hotel</InputLabel>
          <Select
            value={selectedHotelId}
            onChange={(e) => {
              setSelectedHotelId(e.target.value);
              table.resetSelection();
            }}
          >
            {safeHotels.map((h) => (
              <MenuItem key={h.id} value={h.id.toString()}>
                {h.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          startIcon={<AddIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            py: "0.9rem",
            px: 3,
            fontWeight: 600,
            bgcolor: "primary.main",
          }}
          variant="contained"
          onClick={() => table.setOpenAdd(true)}
          disabled={!selectedHotelId}
        >
          Add Room
        </Button>
      </Stack>
      <AdminManageTable
        title="Rooms"
        variant="room"
        data={paginatedRooms}
        loading={isLoading}
        tableHook={table}
        onAddClick={() => table.setOpenAdd(true)}
      />
      <AddRoomDialog
        open={table.openAdd}
        onClose={() => table.setOpenAdd(false)}
        onSubmit={handleAddRoomSubmit}
      />
      {table.selectedItem && (
        <UpdateRoomDialog
          open={table.openUpdate}
          onClose={() => table.setOpenUpdate(false)}
          selectedRoom={{
            roomNumber: String(table.selectedItem.roomNumber),
            cost: table.selectedItem.price,
          }}
          onSubmit={handleUpdateRoomSubmit}
        />
      )}
      {table.selectedItem && selectedHotelId && (
        <DeleteRoomDialog
          open={table.openDelete}
          onClose={() => table.setOpenDelete(false)}
          hotelId={Number(selectedHotelId)}
          roomId={table.selectedItem.roomId}
          onConfirm={handleDeleteRoomSubmit}
        />
      )}
    </Box>
  );
};

export default ManageRooms;
