import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { WarningDialogProps } from "../types";

const WarningDialog = ({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  onConfirm,
  onClose,
}: WarningDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="text" sx={{ color: "text.primary" }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="warning"
          variant="contained"
          sx={{ fontWeight: 600 }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
