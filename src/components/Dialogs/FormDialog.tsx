import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FormDialogProps } from "./types";

const titles = {
  update: "Update Item",
  add: "Add New Item",
} as const;

const FormDialog = ({
  open,
  variant,
  onClose,
  children,
  isSaveDisabled,
  onSubmit,
}: FormDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    disablePortal={false}
    disableRestoreFocus
    disableEnforceFocus
  >
    <DialogTitle>{titles[variant]}</DialogTitle>
    <form
      id="form"
      data-testid="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          form="form"
          variant="contained"
          disabled={isSaveDisabled}
        >
          Save
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default FormDialog;
