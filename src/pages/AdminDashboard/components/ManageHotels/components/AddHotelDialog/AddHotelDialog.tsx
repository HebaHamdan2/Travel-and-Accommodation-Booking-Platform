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
import { useAddHotel } from "../../hooks/useAddHotel";
import { AdminHotel } from "../../../../../../types";
import { AddHotelDialogProps } from "../../types";
import { hotelTypes } from "../../utils";
import { Formik, Form } from "formik";
import { AddValidationSchema } from "../../validation";

const AddHotelDialog: React.FC<AddHotelDialogProps> = ({
  open,
  onClose,
  cities,
  onSuccess,
  onError,
}) => {
  const { handleAddHotel, isLoading } = useAddHotel();

  const initialValues: Omit<AdminHotel, "id"> & { cityId: number | "" } = {
    name: "",
    description: "",
    hotelType: 0,
    starRating: 3,
    latitude: 0,
    longitude: 0,
    cityId: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      const payload: Omit<AdminHotel, "id"> = {
        name: values.name.trim(),
        description: values.description.trim(),
        hotelType: values.hotelType,
        starRating: values.starRating,
        latitude: values.latitude,
        longitude: values.longitude,
      };
      const success = await handleAddHotel(Number(values.cityId), payload);

      if (success) {
        onSuccess?.("Hotel added successfully!");
        onClose();
        resetForm(); // reset all fields
      } else {
        onError?.("Failed to add hotel. Please try again.");
      }
    } catch (err: any) {
      onError?.(err?.message || "Something went wrong while adding the hotel.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Hotel</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={AddValidationSchema}
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
                inputProps={{ step: 1, min: 1, max: 5 }}
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
                inputProps={{ step: 0.000001, min: -90, max: 90 }}
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
                inputProps={{ step: 0.000001, min: -180, max: 180 }}
                fullWidth
                value={values.longitude}
                onChange={handleChange}
                error={touched.longitude && Boolean(errors.longitude)}
                helperText={touched.longitude && errors.longitude}
              />
              <FormControl
                fullWidth
                error={touched.cityId && Boolean(errors.cityId)}
              >
                <InputLabel>City</InputLabel>
                <Select
                  name="cityId"
                  value={values.cityId}
                  onChange={handleChange}
                >
                  {cities.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.cityId && errors.cityId}
                </FormHelperText>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddHotelDialog;
