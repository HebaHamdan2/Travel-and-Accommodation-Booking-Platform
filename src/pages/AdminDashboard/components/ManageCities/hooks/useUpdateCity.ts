import { useState } from "react";
import { useUpdateCityMutation } from "../../../../../services/admin/cities";

export const useUpdateCity = () => {
  const [open, setOpen] = useState(false);
  const [cityToUpdate, setCityToUpdate] = useState<{
    id: number;
    name: string;
    description: string;
  } | null>(null);

  const [updateCity, { isLoading: isUpdating }] = useUpdateCityMutation();

  const handleOpen = (city: {
    id: number;
    name: string;
    description: string;
  }) => {
    setCityToUpdate(city);
    setOpen(true);
  };

  const handleUpdate = async (
    name: string,
    description: string,
    showSnackbar: (msg: string, severity: "success" | "error") => void,
    onSuccess?: () => void
  ) => {
    if (!cityToUpdate) return;
    try {
      await updateCity({
        cityId: cityToUpdate.id,
        city: { name, description },
      }).unwrap();
      showSnackbar("City updated successfully!", "success");
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      showSnackbar("Failed to update city.", "error");
      console.error(err);
    }
  };

  return {
    open,
    setOpen,
    cityToUpdate,
    handleOpen,
    handleUpdate,
    isUpdating,
  };
};
