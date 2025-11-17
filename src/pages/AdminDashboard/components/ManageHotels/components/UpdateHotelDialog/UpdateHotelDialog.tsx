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
import FormikTextField from "../../../../../../components/FormikTextField";

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
        {(formik) => (
          <Form>
            <DialogContent sx={{ display: "grid", gap: 2, mt: 1 }}>
              <FormikTextField name="name" label="Name" formik={formik} />
              <FormikTextField
                name="description"
                label="description"
                formik={formik}
                multiline
                minRows={3}
              />
              <FormControl
                fullWidth
                error={
                  formik.touched.hotelType && Boolean(formik.errors.hotelType)
                }
              >
                <InputLabel>Hotel Type</InputLabel>
                <Select
                  name="hotelType"
                  value={formik.values.hotelType}
                  onChange={formik.handleChange}
                >
                  {hotelTypes.map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.hotelType && formik.errors.hotelType}
                </FormHelperText>
              </FormControl>
              <TextField
                label="Star Rating"
                name="starRating"
                type="number"
                inputProps={{ step: 1, min: 1, max: 5 }} // integers only
                fullWidth
                value={formik.values.starRating}
                onChange={formik.handleChange}
                error={
                  formik.touched.starRating && Boolean(formik.errors.starRating)
                }
                helperText={
                  formik.touched.starRating && formik.errors.starRating
                }
              />

              <TextField
                label="Latitude"
                name="latitude"
                type="number"
                fullWidth
                value={formik.values.latitude}
                onChange={formik.handleChange}
                error={
                  formik.touched.latitude && Boolean(formik.errors.latitude)
                }
                helperText={formik.touched.latitude && formik.errors.latitude}
              />
              <TextField
                label="Longitude"
                name="longitude"
                type="number"
                fullWidth
                value={formik.values.longitude}
                onChange={formik.handleChange}
                error={
                  formik.touched.longitude && Boolean(formik.errors.longitude)
                }
                helperText={formik.touched.longitude && formik.errors.longitude}
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
