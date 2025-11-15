import { useState } from "react";
import { useDeleteHotelByCityIdMutation } from "../../../../../services/admin/cities";

export const useDeleteHotel = () => {
  const [deleteHotel, { isLoading }] = useDeleteHotelByCityIdMutation();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const handleDeleteHotel = async (cityId: number, hotelId: number) => {
    try {
      await deleteHotel({ cityId, hotelId }).unwrap();
      setSnackbar({ open: true, message: "Hotel deleted successfully!", severity: "success" });
      return true;
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.data?.message ?? "Failed to delete hotel", severity: "error" });
      return false;
    }
  };

  return { handleDeleteHotel, isLoading, snackbar, setSnackbar };
};
