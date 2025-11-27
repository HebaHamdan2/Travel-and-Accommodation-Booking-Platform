import { TextField, InputAdornment } from "@mui/material";
import { CommonTextFieldProps } from "./types";
import React from "react";
const CommonTextField: React.FC<CommonTextFieldProps> = (props) => {
  const {
    id,
    name,
    label,
    onChange,
    value,
    error,
    helperText,
    icon,
    inputProps,
    minRows,
    multiline,
    onBlur,
    type,
  } = props;
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

export default CommonTextField;
