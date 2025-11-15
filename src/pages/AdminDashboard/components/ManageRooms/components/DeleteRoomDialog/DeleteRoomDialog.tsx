import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDeleteRoom } from "../../hooks/useDeleteRoom";

interface Props {
  open: boolean;
  onClose: () => void;
  hotelId: number;
  roomId: number | null;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}

const DeleteRoomDialog: React.FC<Props> = ({
  open,
  onClose,
  hotelId,
  roomId,
  onSuccess,
  onError,
}) => {
  const { handleDeleteRoom, isLoading, snackbar, setSnackbar } =
    useDeleteRoom();

  const confirm = async () => {
    if (!roomId) return;
    const ok = await handleDeleteRoom(hotelId, roomId);
    if (ok) {
      onSuccess?.("Room deleted");
    } else {
      onError?.("Failed to delete room");
    }
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this room? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
};

export default DeleteRoomDialog;
