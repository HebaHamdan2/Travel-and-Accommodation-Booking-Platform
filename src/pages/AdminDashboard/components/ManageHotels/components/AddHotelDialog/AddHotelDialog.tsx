import React from "react";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { AdminHotel } from "../../../../../../types";
import { AddHotelDialogProps } from "../../types";
import { hotelTypes } from "../../utils";
import { FormikHelpers } from "formik";
import { AddValidationSchema } from "../../validation";
import GenericDialog from "@/components/GenericDialog";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
const AddHotelDialog: React.FC<AddHotelDialogProps> = ({
  open,
  onClose,
  cities,
  onSubmit,
}) => {
  const initialValues: Omit<AdminHotel, "id"> & { cityId: number | "" } = {
    name: "",
    description: "",
    hotelType: 0,
    starRating: 3,
    latitude: 0,
    longitude: 0,
    cityId: 0,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    helpers: FormikHelpers<typeof initialValues>
  ): Promise<boolean> => {
    const payload: Omit<AdminHotel, "id"> = {
      name: values.name.trim(),
      description: values.description.trim(),
      hotelType: values.hotelType,
      starRating: values.starRating,
      latitude: values.latitude,
      longitude: values.longitude,
    };

    const success = await onSubmit(payload, values.cityId, () =>
      helpers.resetForm()
    );
    if (success) {
      onClose();
      helpers.resetForm();
    }

    return success;
  };

  return (
    <GenericDialog<typeof initialValues>
      open={open}
      onClose={onClose}
      variant="add"
      initialValues={initialValues}
      validationSchema={AddValidationSchema}
      onSubmit={handleSubmit}
      renderForm={(formik) => (
        <>
          <GenericTextField
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={
              (formik.touched.name && formik.errors.name) || undefined
            }
          />
          <GenericTextField
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={
              (formik.touched.description && formik.errors.description) ||
              undefined
            }
            multiline
            minRows={3}
          />

          <FormControl
            fullWidth
            variant="standard"
            margin="normal"
            error={formik.touched.hotelType && Boolean(formik.errors.hotelType)}
          >
            <InputLabel>Hotel Type</InputLabel>
            <Select
              name="hotelType"
              value={formik.values.hotelType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

          <GenericTextField
            name="starRating"
            label="Star Rating"
            type="number"
            inputProps={{ step: 1, min: 1, max: 5 }}
            value={formik.values.starRating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.starRating && !!formik.errors.starRating}
            helperText={
              (formik.touched.starRating && formik.errors.starRating) ||
              undefined
            }
          />

          <GenericTextField
            name="latitude"
            label="Latitude"
            type="number"
            inputProps={{ step: 0.000001, min: -90, max: 90 }}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.latitude && !!formik.errors.latitude}
            helperText={
              (formik.touched.latitude && formik.errors.latitude) || undefined
            }
          />
          <GenericTextField
            name="longitude"
            label="Longitude"
            type="number"
            inputProps={{ step: 0.000001, min: -180, max: 180 }}
            value={formik.values.longitude}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.longitude && !!formik.errors.longitude}
            helperText={
              (formik.touched.longitude && formik.errors.longitude) || undefined
            }
          />

          <FormControl
            fullWidth
            variant="standard"
            margin="normal"
            error={formik.touched.cityId && Boolean(formik.errors.cityId)}
          >
            <InputLabel>City</InputLabel>
            <Select
              name="cityId"
              value={formik.values.cityId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
        </>
      )}
    />
  );
};

export default AddHotelDialog;
