import React from "react";
import { useFormik } from "formik";
import { City } from "@/types";
import { CitySchema } from "../../validation";
import { AddCityProps } from "../../types";
import FormDialog from "@/components/Dialogs/FormDialog";
import CommonTextField from "@/components/TextField/CommonTextField";
const AddCityDialog: React.FC<AddCityProps> = ({ open, onClose, onSubmit }) => {
  const initialValues: Omit<City, "id"> = { name: "", description: "" };
  const handleSubmit = async (values: Omit<City, "id">) => {
    const success = await onSubmit(values.name, values.description);
    if (success) {
      onClose();
      formik.resetForm();
    }
    return success;
  };
  const formik = useFormik({
    initialValues,
    validationSchema: CitySchema,
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
        label="City Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={(formik.touched.name && formik.errors.name) || undefined}
      />
      <CommonTextField
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        multiline
        minRows={3}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={
          (formik.touched.description && formik.errors.description) || undefined
        }
      />
    </FormDialog>
  );
};

export default AddCityDialog;
