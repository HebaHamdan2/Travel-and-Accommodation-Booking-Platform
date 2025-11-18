import React from "react";
import { TextField } from "@mui/material";
import { FormikHelpers } from "formik";
import { City } from "@/types";
import { CitySchema } from "../../validation";
import { AddCityProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
const AddCityDialog: React.FC<AddCityProps> = ({ open, onClose, onSubmit }) => {
  const initialValues: Omit<City, "id"> = { name: "", description: "" };
  const handleSubmit = async (
    values: Omit<City, "id">,
    helpers: FormikHelpers<Omit<City, "id">>
  ) => {
    const success = await onSubmit(values.name, values.description, () =>
      helpers.resetForm()
    );
    if (success) {
      onClose();
    }
    return success;
  };
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      variant="add"
      initialValues={initialValues}
      validationSchema={CitySchema}
      onSubmit={handleSubmit}
      renderForm={({ values, errors, touched, handleChange, handleBlur }) => (
        <>
          <TextField
            name="name"
            label="City Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            variant="standard"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            name="description"
            label="Description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            variant="standard"
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
          />
        </>
      )}
    />
  );
};

export default AddCityDialog;
