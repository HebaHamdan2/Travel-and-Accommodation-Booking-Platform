import { Dayjs } from "dayjs";

export interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  minDate?: Dayjs;
  disablePast?: boolean;
}