import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";

export const PickerTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (params, ref) => (
    <TextField
      {...params}
      ref={ref}
      size="small"
      variant="outlined"
      sx={{
        minWidth: 140,
        flex: 1,
        borderRadius: 1,
      }}
    />
  )
);
