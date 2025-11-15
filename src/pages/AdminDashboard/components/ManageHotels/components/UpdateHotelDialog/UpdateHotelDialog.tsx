import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Select,
  FormHelperText,
} from "@mui/material";
import { useUpdateHotel } from "../../hooks/useUpdateHotel";
import { AdminHotel } from "../../../../../../types";
import { UpdateHotelDialogProps } from "../../types";
import { hotelTypes } from "../../utils";
import { Formik, Form } from "formik";
import { UpdateValidationSchema } from "../../validation";

const UpdateHotelDialog: React.FC<UpdateHotelDialogProps> = ({
  open,
  onClose,
  hotel,
  onSuccess,
  onError,
}) => {
  const { handleUpdateHotel, isLoading } = useUpdateHotel();

  if (!hotel) return null;

  const initialValues: Omit<AdminHotel, "id"> = {
    name: hotel.name,
    description: hotel.description,
    hotelType: hotel.hotelType,
    starRating: hotel.starRating,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const success = await handleUpdateHotel(hotel.id, values as AdminHotel);

      if (success) {
        onSuccess?.("Hotel updated successfully!");
        onClose();
      } else {
        onError?.("Failed to update hotel. Please try again.");
      }
    } catch (err: any) {
      onError?.(
        err?.message || "Something went wrong while updating the hotel."
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Hotel</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateValidationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <DialogContent sx={{ display: "grid", gap: 2, mt: 1 }}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                minRows={3}
                value={values.description}
                onChange={handleChange}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <FormControl
                fullWidth
                error={touched.hotelType && Boolean(errors.hotelType)}
              >
                <InputLabel>Hotel Type</InputLabel>
                <Select
                  name="hotelType"
                  value={values.hotelType}
                  onChange={handleChange}
                >
                  {hotelTypes.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.hotelType && errors.hotelType}
                </FormHelperText>
              </FormControl>
              <TextField
                label="Star Rating"
                name="starRating"
                type="number"
                inputProps={{ step: 1, min: 1, max: 5 }} // integers only
                fullWidth
                value={values.starRating}
                onChange={handleChange}
                error={touched.starRating && Boolean(errors.starRating)}
                helperText={touched.starRating && errors.starRating}
              />

              <TextField
                label="Latitude"
                name="latitude"
                type="number"
                fullWidth
                value={values.latitude}
                onChange={handleChange}
                error={touched.latitude && Boolean(errors.latitude)}
                helperText={touched.latitude && errors.latitude}
              />
              <TextField
                label="Longitude"
                name="longitude"
                type="number"
                fullWidth
                value={values.longitude}
                onChange={handleChange}
                error={touched.longitude && Boolean(errors.longitude)}
                helperText={touched.longitude && errors.longitude}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateHotelDialog;
