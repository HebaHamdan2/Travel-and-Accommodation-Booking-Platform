import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { DeleteDialogVariantProps } from "../types";
const DeleteDialog = ({
  open,
  title,
  onClose,
  onConfirm,
  confirmText,
}: DeleteDialogVariantProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      disablePortal={false}
      disableRestoreFocus
      disableEnforceFocus
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          {confirmText || "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
