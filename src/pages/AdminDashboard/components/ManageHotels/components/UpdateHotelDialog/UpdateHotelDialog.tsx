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
import FormikTextField from "../../../../../../components/FormikTextField";
import GenericDialog from "@/components/GenericDialog";
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
        </>
      )}
    />
  );
};

export default UpdateHotelDialog;
