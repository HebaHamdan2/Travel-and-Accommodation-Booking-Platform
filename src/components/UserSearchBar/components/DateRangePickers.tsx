import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import { ensureValidCheckOut, formatDate } from "@/utils/dateUtils";
import CustomDatePicker from "@/components/CustomDatePicker/CustomDatePicker";
import React from "react";
import { DateRangePickersProps } from "../types";
const DateRangePickers: React.FC<DateRangePickersProps> = ({
  checkIn,
  checkOut,
  update,
}) => {
  const onCheckIn = (date: Dayjs | null) => {
    if (!date) return;
    const formattedIn = formatDate(date);
    const validOut = ensureValidCheckOut(date, checkOut);
    update("checkInDate", formattedIn);
    update("checkOutDate", validOut);
  };

  const onCheckOut = (date: Dayjs | null) => {
    if (!date) return;
    update("checkOutDate", ensureValidCheckOut(checkIn, date));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flex: { xs: "0 0 100%", sm: "0 0 auto", md: 1 },
        minWidth: { xs: "100%", sm: 320 },
        justifyContent: "space-between",
      }}
    >
      <CustomDatePicker
        label="Check in"
        disablePast
        value={checkIn ? dayjs(checkIn) : null}
        onChange={onCheckIn}
      />
      <CustomDatePicker
        label="Check out"
        value={checkOut ? dayjs(checkOut) : dayjs().add(1, "day")}
        minDate={checkIn ? dayjs(checkIn).add(1, "day") : undefined}
        onChange={onCheckOut}
      />
    </Box>
  );
};

export default DateRangePickers;
