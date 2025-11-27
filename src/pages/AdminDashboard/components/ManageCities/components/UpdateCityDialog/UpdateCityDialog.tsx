import { City } from "@/types";
import React from "react";
import { UpdateCityProps } from "../../types";
import { CitySchema } from "../../validation";
import FormDialog from "@/components/Dialogs/FormDialog";
import CommonTextField from "@/components/TextField/CommonTextField";
import { useFormik } from "formik";
const UpdateCityDialog: React.FC<UpdateCityProps> = ({
  open,
  onClose,
  selectedCity,
  onSubmit,
}) => {
  const handleSubmit = async (values: Omit<City, "id">) => {
    const ok = await onSubmit({
      name: values.name,
      description: values.description,
    });
    if (ok) {
      onClose();
      formik.resetForm();
    }
    return ok;
  };
  const initialValues = {
    name: selectedCity?.name ?? "",
    description: selectedCity?.description ?? "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CitySchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      variant="update"
      isSaveDisabled={!(formik.isValid && formik.dirty)}
      onSubmit={formik.handleSubmit}
    >
      <CommonTextField
        label="City Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={(formik.touched.name && formik.errors.name) || undefined}
      />
      <CommonTextField
        label="Description"
        name="description"
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

export default UpdateCityDialog;
