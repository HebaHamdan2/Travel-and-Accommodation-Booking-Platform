import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { SuccessDialogProps } from "../types";

const SuccessDialog = ({
  open,
  title = "Success",
  message = "Operation completed successfully.",
  confirmText = "OK",
  onClose,
}: SuccessDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
