import React from "react";
import { DeleteCityProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
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
    <GenericDialog
      open={open}
      onClose={onClose}
      variant="delete"
      title={`Delete City: ${cityName}`}
      confirmText="Delete"
      onConfirm={handleConfirm}
    />
  );
};

export default DeleteCityDialog;
