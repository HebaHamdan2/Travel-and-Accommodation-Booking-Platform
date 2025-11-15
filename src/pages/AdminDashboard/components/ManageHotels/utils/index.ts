import { HOTEL_TYPE_LABELS } from "../../../../../utils/constans";

  export const hotelTypes = Object.entries(HOTEL_TYPE_LABELS).map(([key, label]) => ({
    value: Number(key),
    label,
  }));