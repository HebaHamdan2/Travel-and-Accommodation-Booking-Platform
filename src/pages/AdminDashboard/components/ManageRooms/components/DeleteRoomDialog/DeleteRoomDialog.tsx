import React from "react";
import { DeleteRoomProps } from "../../types";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
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
      <DeleteDialog open={open} onClose={onClose} onConfirm={handleConfirm} />
    </>
  );
};

export default DeleteRoomDialog;
