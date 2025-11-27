import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { WarningDialogProps } from "./types";

const WarningDialog = ({
  open,
  onConfirm,
  onClose,
  message,
}: WarningDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
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
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
