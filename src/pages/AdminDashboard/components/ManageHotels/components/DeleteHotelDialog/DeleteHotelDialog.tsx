import React from "react";
import { DeleteHotelDialogProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
const DeleteHotelDialog: React.FC<DeleteHotelDialogProps> = ({
  open,
  onClose,
  hotelId,
  cityId,
  onConfirm,
}) => {
  const handleConfirm = async () => {
    if (!cityId) return;
    onConfirm(hotelId, cityId); // send data back to parent
    onClose();
  };

  return (
    <>
      <GenericDialog
        open={open}
        onClose={onClose}
        variant="delete"
        title={`Delete Hotel`}
        confirmText="Delete"
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteHotelDialog;
