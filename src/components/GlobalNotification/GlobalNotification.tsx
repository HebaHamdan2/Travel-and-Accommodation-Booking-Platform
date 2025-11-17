import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearNotification } from "../../features/notifications/notificationsSlice";

const GlobalNotification = () => {
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state) => state.notifications);
  if (!message) return null;
  const handleClose = () => {
    dispatch(clearNotification());
  };
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={type ?? "error"}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalNotification;
