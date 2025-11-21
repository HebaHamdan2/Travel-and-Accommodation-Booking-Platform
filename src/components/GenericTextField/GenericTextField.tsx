import { TextField, InputAdornment } from "@mui/material";
import { GenericTextFieldProps } from "./types";
function GenericTextField({
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
}: GenericTextFieldProps) {
  return (
    <TextField
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
}

export default GenericTextField;
