import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CustomDatePickerProps } from "../../types";
import { PickerTextField } from "./PickerTextField";

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
