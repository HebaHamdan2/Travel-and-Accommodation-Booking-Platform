import React from "react";
import { DeleteCityProps } from "../../types";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
const DeleteCityDialog: React.FC<DeleteCityProps> = ({
  open,
  onClose,
  cityId,
  cityName,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (!cityId) return;
    onConfirm(cityId, cityName); // send data back to parent
    onClose();
  };

  return (
    <DeleteDialog open={open} onClose={onClose} onConfirm={handleConfirm} />
  );
};

export default DeleteCityDialog;
