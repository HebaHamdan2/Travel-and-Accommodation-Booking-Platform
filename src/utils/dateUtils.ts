import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs | string | null): string => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};

export const addDays = (date: Dayjs | string, days: number): string => {
  return dayjs(date).add(days, "day").format("YYYY-MM-DD");
};

export const ensureValidCheckOut = (
  checkIn: Dayjs | string,
  checkOut: Dayjs | string | null
): string => {
  const checkInDay = dayjs(checkIn);
  const checkOutDay = checkOut ? dayjs(checkOut) : null;

 if (!checkOutDay || !checkOutDay.isAfter(checkInDay)) {
    return addDays(checkInDay, 1);
  }


  return formatDate(checkOutDay);
};
