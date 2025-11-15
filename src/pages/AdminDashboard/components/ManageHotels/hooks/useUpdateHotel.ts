import { useState } from "react";
import { useUpdateHotelMutation } from "../../../../../services/admin/hotels";
import { AdminHotel } from "../../../../../types";

export const useUpdateHotel = () => {
  const [updateHotel, { isLoading }] = useUpdateHotelMutation();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const handleUpdateHotel = async (hotelId: number, hotel: AdminHotel) => {
    try {
      await updateHotel({ hotelId, hotel }).unwrap();
      setSnackbar({ open: true, message: "Hotel updated successfully!", severity: "success" });
      return true;
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.data?.message ?? "Failed to update hotel", severity: "error" });
      return false;
    }
  };

  return { handleUpdateHotel, isLoading, snackbar, setSnackbar };
};
