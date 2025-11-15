import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import { AddRoomSchema } from "../../validation";
import { RoomBodyRequest } from "../../../../../../types";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedRoom: RoomBodyRequest | null;
  onSubmit: (room: RoomBodyRequest) => Promise<boolean>;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}

const UpdateRoomDialog: React.FC<Props> = ({
  open,
  onClose,
  selectedRoom,
  onSubmit,
  onSuccess,
  onError,
}) => {
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleSubmit = async (values: RoomBodyRequest) => {
    const ok = await onSubmit({
      roomNumber: values.roomNumber,
      cost: Number(values.cost),
    });
    if (ok) {
      setSnackbar({
        open: true,
        message: "Room updated successfully!",
        severity: "success",
      });
      onSuccess?.("Room updated successfully!");
      onClose();
    } else {
      setSnackbar({
        open: true,
        message: "Failed to update room",
        severity: "error",
      });
      onError?.("Failed to update room");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Room</DialogTitle>
        <Formik
          enableReinitialize
          initialValues={{
            roomNumber: selectedRoom?.roomNumber ?? "",
            cost: selectedRoom?.cost ?? 0,
          }}
          validationSchema={AddRoomSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <DialogContent dividers>
                <TextField
                  label="Room Number"
                  name="roomNumber"
                  fullWidth
                  margin="normal"
                  value={values.roomNumber}
                  onChange={handleChange}
                  error={touched.roomNumber && Boolean(errors.roomNumber)}
                  helperText={touched.roomNumber && errors.roomNumber}
                />
                <TextField
                  label="Cost"
                  name="cost"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={values.cost}
                  onChange={handleChange}
                  error={touched.cost && Boolean(errors.cost)}
                  helperText={touched.cost && errors.cost}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Update Room
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
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

export default UpdateRoomDialog;
