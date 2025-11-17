import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FormikProps } from "formik";

interface Props<T> {
  name: keyof T & string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
  formik: FormikProps<T>;
  multiline?: boolean;
  minRows?: number;
  inputProps?: any;
}

function FormikTextField<T>({
  name,
  label,
  type = "text",
  icon,
  formik,
  multiline,
  minRows,
  inputProps,
}: Props<T>) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      multiline={multiline}
      minRows={minRows}
      value={formik.values[name] as any}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && (formik.errors[name] as any)}
      inputProps={inputProps}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : undefined,
      }}
    />
  );
}

export default FormikTextField;
