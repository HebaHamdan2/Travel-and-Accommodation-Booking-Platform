import React from "react";
import { DeleteHotelDialogProps } from "../../types";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
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
      <DeleteDialog open={open} onClose={onClose} onConfirm={handleConfirm} />
    </>
  );
};

export default DeleteHotelDialog;
