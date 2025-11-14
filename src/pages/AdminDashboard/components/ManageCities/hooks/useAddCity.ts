import { useState } from "react";
import { useAddCityMutation } from "../../../../../services/admin/cities";
type ShowSnackbar = (message: string, severity: "success" | "error") => void;

export const useAddCity = () => {
  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const [open, setOpen] = useState(false);

  const handleAddCity = async (
    e: React.FormEvent<HTMLFormElement>,
    name: string,
    description: string,
    showSnackbar?: ShowSnackbar,
    resetFields?: () => void,
    resetPage?: () => void
  ) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      await addCity({ name, description }).unwrap();
      showSnackbar?.("City added successfully!", "success");
      resetFields?.();
      resetPage?.();
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      showSnackbar?.("Failed to add city.", "error");
    }
  };

  return {
    open,
    setOpen,
    handleAddCity,
    isAdding,
  };
};
