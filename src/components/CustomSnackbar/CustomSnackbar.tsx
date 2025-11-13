import * as React from 'react';
import Snackbar, { SnackbarCloseReason, SnackbarOrigin } from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor; // "error" | "warning" | "info" | "success"
  autoHideDuration?: number;
  onClose: () => void;
  anchorOrigin?: SnackbarOrigin;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 4000,
  onClose,
  anchorOrigin 
}) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return; // prevent closing on clickaway
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
