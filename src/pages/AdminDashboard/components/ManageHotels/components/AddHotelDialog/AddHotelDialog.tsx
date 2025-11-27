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
import { useFormik } from "formik";
import { AddValidationSchema } from "../../validation";
import FormDialog from "@/components/Dialogs/FormDialog";
import CommonTextField from "@/components/TextField/CommonTextField";
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
    cityId: "",
  };
  const handleSubmit = async (
    values: typeof initialValues
  ): Promise<boolean> => {
    const payload: Omit<AdminHotel, "id"> = {
      name: values.name.trim(),
      description: values.description.trim(),
      hotelType: values.hotelType,
      starRating: values.starRating,
      latitude: values.latitude,
      longitude: values.longitude,
    };

    const success = await onSubmit(payload, values.cityId);
    if (success) {
      onClose();
      formik.resetForm();
    }

    return success;
  };
  const formik = useFormik({
    initialValues,
    validationSchema: AddValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      variant="add"
      isSaveDisabled={!(formik.isValid && formik.dirty)}
      onSubmit={formik.handleSubmit}
    >
      <CommonTextField
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && !!formik.errors.name}
        helperText={(formik.touched.name && formik.errors.name) || undefined}
      />
      <CommonTextField
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && !!formik.errors.description}
        helperText={
          (formik.touched.description && formik.errors.description) || undefined
        }
        multiline
        minRows={3}
      />
      {/* Hotel Type */}
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
      {/* Star Rating */}
      <CommonTextField
        name="starRating"
        label="Star Rating"
        type="number"
        inputProps={{ step: 1, min: 1, max: 5 }}
        value={formik.values.starRating}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.starRating && !!formik.errors.starRating}
        helperText={
          (formik.touched.starRating && formik.errors.starRating) || undefined
        }
      />
      {/* Latitude */}
      <CommonTextField
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
      {/* Longitude */}
      <CommonTextField
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
      {/* City Select */}
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
    </FormDialog>
  );
};

export default AddHotelDialog;
