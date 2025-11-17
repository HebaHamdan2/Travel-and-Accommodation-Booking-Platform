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
  Select,
  FormHelperText,
} from "@mui/material";
import { useAddHotel } from "../../hooks/useAddHotel";
import { AdminHotel } from "../../../../../../types";
import { AddHotelDialogProps } from "../../types";
import { hotelTypes } from "../../utils";
import { Formik, Form } from "formik";
import { AddValidationSchema } from "../../validation";
import FormikTextField from "../../../../../../components/FormikTextField";

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
        {(formik) => (
          <Form>
            <DialogContent sx={{ display: "grid", gap: 2, mt: 1 }}>
              <FormikTextField name="name" label="Name" formik={formik} />
              <FormikTextField
                name="description"
                label="Description"
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

              <FormikTextField
                name="starRating"
                label="Star Rating"
                type="number"
                inputProps={{ step: 1, min: 1, max: 5 }}
                formik={formik}
              />

              <FormikTextField
                name="latitude"
                label="Latitude"
                type="number"
                inputProps={{ step: 0.000001, min: -90, max: 90 }}
                formik={formik}
              />
              <FormikTextField
                name="longitude"
                label="Longitude"
                type="number"
                inputProps={{ step: 0.000001, min: -180, max: 180 }}
                formik={formik}
              />
              <FormControl
                fullWidth
                error={formik.touched.cityId && Boolean(formik.errors.cityId)}
              >
                <InputLabel>City</InputLabel>
                <Select
                  name="cityId"
                  value={formik.values.cityId}
                  onChange={formik.handleChange}
                >
                  {cities.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.cityId && formik.errors.cityId}
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
