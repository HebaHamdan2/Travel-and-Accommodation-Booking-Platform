import { TextField, InputAdornment } from "@mui/material";
import { GenericTextFieldProps } from "./types";
import React from "react";
const GenericTextField: React.FC<GenericTextFieldProps> = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  helperText,
  icon,
  multiline,
  minRows,
  inputProps,
}) => {
  return (
    <TextField
      id={id || name}
      fullWidth
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline}
      minRows={minRows}
      variant="standard"
      margin="normal"
      inputProps={inputProps}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : undefined,
      }}
    />
  );
};

export default GenericTextField;
