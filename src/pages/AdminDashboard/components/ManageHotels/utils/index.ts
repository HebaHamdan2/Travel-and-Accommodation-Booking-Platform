import { HOTEL_TYPE_LABELS } from "@/pages/AdminDashboard/constans";

  export const hotelTypes = Object.entries(HOTEL_TYPE_LABELS).map(([key, label]) => ({// to use it on seletion list 
    value: Number(key),
    label,
  }));