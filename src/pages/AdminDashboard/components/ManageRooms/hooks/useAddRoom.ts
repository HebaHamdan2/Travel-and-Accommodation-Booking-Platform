import { useState } from "react";
import { useAddHotelRoomMutation } from "../../../../../services/admin/hotels";
import { RoomBodyRequest } from "../../../../../types";

export const useAddRoom = () => {
  const [addRoom, { isLoading }] = useAddHotelRoomMutation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleAddRoom = async (hotelId: number, room: RoomBodyRequest) => {
    try {
      await addRoom({ hotelId, room }).unwrap();
      setSnackbar({
        open: true,
        message: "Room added successfully!",
        severity: "success",
      });
      return true;
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.data?.message ?? "Failed to add room",
        severity: "error",
      });
      return false;
    }
  };

  return { handleAddRoom, isLoading, snackbar, setSnackbar };
};
