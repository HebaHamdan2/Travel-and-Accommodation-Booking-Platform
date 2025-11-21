import React from "react";
import { FormikHelpers } from "formik";
import { City } from "@/types";
import { CitySchema } from "../../validation";
import { AddCityProps } from "../../types";
import GenericDialog from "@/components/GenericDialog";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
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
          <GenericTextField
            name="name"
            label="City Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={(touched.name && errors.name) || undefined}
          />
          <GenericTextField
            name="description"
            label="Description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            minRows={3}
            error={touched.description && Boolean(errors.description)}
            helperText={
              (touched.description && errors.description) || undefined
            }
          />
        </>
      )}
    />
  );
};

export default AddCityDialog;
