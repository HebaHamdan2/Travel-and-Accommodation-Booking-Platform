import React from "react";
import { DeleteRoomProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
const DeleteRoomDialog: React.FC<DeleteRoomProps> = ({
  open,
  onClose,
  hotelId,
  roomId,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (!roomId) return;
    onConfirm(hotelId, roomId); // send data back to parent
    onClose();
  };
  return (
    <>
      <GenericDialog
        open={open}
        onClose={onClose}
        variant="delete"
        title={`Delete Room`}
        confirmText="Delete"
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteRoomDialog;
