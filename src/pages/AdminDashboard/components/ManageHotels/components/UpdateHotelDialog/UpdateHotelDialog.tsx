import React from "react";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { AdminHotel } from "../../../../../../types";
import { UpdateHotelDialogProps } from "../../types";
import { hotelTypes } from "../../utils";
import { UpdateValidationSchema } from "../../validation";
import GenericDialog from "@/components/GenericDialog";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
const UpdateHotelDialog: React.FC<UpdateHotelDialogProps> = ({
  open,
  onClose,
  hotel,
  onSubmit,
}) => {
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
    const ok = await onSubmit(hotel.id, values as AdminHotel);
    if (ok) {
      onClose();
    }
    return ok;
  };

  return (
    <GenericDialog<Omit<AdminHotel, "id">>
      open={open}
      onClose={onClose}
      variant="update"
      title={`Update Hotel: ${hotel?.name || ""}`}
      initialValues={initialValues}
      validationSchema={UpdateValidationSchema}
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
            value={formik.values.latitude}
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
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.longitude && !!formik.errors.longitude}
            helperText={
              (formik.touched.longitude && formik.errors.longitude) || undefined
            }
          />
        </>
      )}
    />
  );
};

export default UpdateHotelDialog;
