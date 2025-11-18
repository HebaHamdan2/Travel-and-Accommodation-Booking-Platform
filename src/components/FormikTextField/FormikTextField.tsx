import { TextField, InputAdornment } from "@mui/material";
import { FormikTextFieldProps } from "./types";

function FormikTextField<T>({
  name,
  label,
  type = "text",
  icon,
  formik,
  multiline,
  minRows,
  inputProps,
}: FormikTextFieldProps<T>) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      multiline={multiline}
      minRows={minRows}
      variant="standard"
      margin="normal"
      value={formik.values[name as keyof T] as any}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched[name as keyof T] &&
        Boolean(formik.errors[name as keyof T])
      }
      helperText={
        formik.touched[name as keyof T] &&
        (formik.errors[name as keyof T] as any)
      }
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
