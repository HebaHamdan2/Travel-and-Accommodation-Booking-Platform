import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDeleteHotel } from "../../hooks/useDeleteHotel";
import { DeleteHotelDialogProps } from "../../types";

const DeleteHotelDialog: React.FC<DeleteHotelDialogProps> = ({
  open,
  onClose,
  hotelId,
  cityId,
  onSuccess,
  onError,
}) => {
  const { handleDeleteHotel, isLoading } = useDeleteHotel();

  const handleConfirm = async () => {
    try {
      const success = await handleDeleteHotel(cityId, hotelId);
      if (success) {
        onSuccess?.("Hotel deleted successfully!");
        onClose();
      } else {
        onError?.("Failed to delete hotel. Please try again.");
      }
    } catch (err: any) {
      onError?.(
        err?.message || "Something went wrong while deleting the hotel."
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="delete-hotel-dialog"
      >
        <DialogTitle id="delete-hotel-dialog">Delete Hotel</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this hotel? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteHotelDialog;
