import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerTextField } from "./PickerTextField";
import { CustomDatePickerProps } from "./types";

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  minDate,
  disablePast,
}) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      minDate={minDate}
      disablePast={disablePast}
      enableAccessibleFieldDOMStructure={false}
      slots={{ textField: PickerTextField }}
    />
  );
};

export default CustomDatePicker;
