import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { SelectFieldProps } from "../types";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  list,
  onChange,
}) => {
  const handleSelect = (e: SelectChangeEvent<number>) =>
    onChange(Number(e.target.value));

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleSelect}>
        {list.map((n) => (
          <MenuItem key={n} value={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SelectField;
