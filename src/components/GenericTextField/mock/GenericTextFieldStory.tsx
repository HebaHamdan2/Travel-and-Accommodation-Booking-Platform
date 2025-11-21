import React, { useState } from "react";
import GenericTextField from "../GenericTextField";
import { GenericTextFieldStotyProps } from "../types";

const GenericTextFieldStory: React.FC<GenericTextFieldStotyProps> = ({
  name,
  label,
  value: initialValue = "",
  multiline = false,
  minRows,
  icon,
  helperText: initialHelperText = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const showError = touched && !value;
  const showHelperText = showError
    ? initialHelperText || "This field is required"
    : "";

  return (
    <GenericTextField
      name={name}
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => setTouched(true)}
      error={!!showError}
      helperText={showHelperText}
      multiline={multiline}
      minRows={minRows}
      icon={icon}
    />
  );
};

export default GenericTextFieldStory;
