import dayjs from "dayjs";

export const calculateNights = (checkIn: string, checkOut: string) =>
  Math.max(dayjs(checkOut).diff(dayjs(checkIn), "day"), 1);

export const calculateRoomsTotal = (rooms: { price: number }[], nights: number) =>
  rooms.reduce((sum, room) => sum + room.price * nights, 0);