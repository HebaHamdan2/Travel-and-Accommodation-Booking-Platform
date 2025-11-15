import { useState } from "react";
import { useDeleteHotelRoomMutation } from "../../../../../services/admin/hotels";

export const useDeleteRoom = () => {
  const [deleteRoom, { isLoading }] = useDeleteHotelRoomMutation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleDeleteRoom = async (hotelId: number, roomId: number) => {
    try {
      await deleteRoom({ hotelId, roomId }).unwrap();
      setSnackbar({
        open: true,
        message: "Hotel deleted successfully!",
        severity: "success",
      });
      return true;
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.data?.message ?? "Failed to delete room",
        severity: "error",
      });
      return false;
    }
  };

  return { handleDeleteRoom, isLoading, snackbar, setSnackbar };
};
