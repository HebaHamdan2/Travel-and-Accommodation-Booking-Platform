import { useState } from "react";
import { RoomBodyRequest } from "../../../../../types";
import { useUpdateRoomMutation } from "../../../../../services/admin/rooms";

export const useUpdateRoom = () => {
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleUpdateRoom = async (roomId: number, room: RoomBodyRequest) => {
    try {
      await updateRoom({ roomId, room }).unwrap();
      setSnackbar({
        open: true,
        message: "Room updated successfully!",
        severity: "success",
      });
      return true;
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.data?.message ?? "Failed to update room",
        severity: "error",
      });
      return false;
    }
  };

  return { handleUpdateRoom, isLoading, snackbar, setSnackbar };
};
