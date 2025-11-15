import { useState } from "react";
import { useAddHotelByCityIdMutation } from "../../../../../services/admin/cities";
import { AdminHotel } from "../../../../../types";

export const useAddHotel = () => {
  const [addHotel, { isLoading }] = useAddHotelByCityIdMutation();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  const handleAddHotel = async (cityId: number, hotel: Omit<AdminHotel,"id">) => {
    try {
      await addHotel({ cityId, hotel }).unwrap();
      setSnackbar({ open: true, message: "Hotel added successfully!", severity: "success" });
      return true;
    } catch (err: any) {
      setSnackbar({ open: true, message: err?.data?.message ?? "Failed to add hotel", severity: "error" });
      return false;
    }
  };

  return { handleAddHotel, isLoading, snackbar, setSnackbar };
};
