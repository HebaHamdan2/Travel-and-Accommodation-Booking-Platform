import { useState } from "react";
import { useDeleteCityMutation } from "../../../../../services/admin/cities";

export const useDeleteCity = () => {
  const [open, setOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [deleteCity, { isLoading: isDeleting }] = useDeleteCityMutation();

  const confirmDelete = (
    city: { id: number; name: string },
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.currentTarget.blur();
    setCityToDelete(city);
    setOpen(true);
  };

  const handleConfirmDelete = async (
    showSnackbar: (msg: string, sev: "success" | "error") => void
  ) => {
    if (!cityToDelete) return;
    try {
      await deleteCity(cityToDelete.id).unwrap();
      showSnackbar("City deleted successfully!", "success");
    } catch (error: any) {
      showSnackbar("Failed to delete city", "error");
    } finally {
      setOpen(false);
      setCityToDelete(null);
    }
  };

  return {
    open,
    setOpen,
    cityToDelete,
    confirmDelete,
    handleConfirmDelete,
    isDeleting,
  };
};
