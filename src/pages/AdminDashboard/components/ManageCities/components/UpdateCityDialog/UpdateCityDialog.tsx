import { City } from "@/types";
import React from "react";
import { UpdateCityProps } from "../../types";
import { CitySchema } from "../../validation";
import GenericDialog from "@/components/GenericDialog";
import GenericTextField from "@/components/GenericTextField/GenericTextField";
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
    }
    return ok;
  };
  return (
    <GenericDialog<Omit<City, "id">>
      open={open}
      onClose={onClose}
      variant="update"
      title={`Update City: ${selectedCity?.name}`}
      initialValues={{
        name: selectedCity?.name ?? "",
        description: selectedCity?.description ?? "",
      }}
      validationSchema={CitySchema}
      onSubmit={handleSubmit}
      renderForm={({ values, errors, touched, handleChange, handleBlur }) => (
        <>
          <GenericTextField
            label="City Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={(touched.name && errors.name) || undefined}
          />
          <GenericTextField
            label="Description"
            name="description"
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

export default UpdateCityDialog;
