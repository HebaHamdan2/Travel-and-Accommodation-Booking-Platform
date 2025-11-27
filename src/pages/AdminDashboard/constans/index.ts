import { HotelType } from "@/types";

export const HOTEL_TYPE_LABELS: Record<HotelType, string> = {
  [HotelType.Boutique]: "Boutique",
  [HotelType.Resort]: "Resort",
  [HotelType.Budget]: "Budget",
  [HotelType.Business]: "Business",
};

export const ADMIN_HEADERS = {
  room: [
    "ID",
    "Number",
    "Type",
    "Adults Capacity",
    "Children Capacity",
    "Amenities",
    "Price",
    "Availability",
  ],
  hotel: [
    "ID",
    "Name",
    "Description",
    "Type",
    "Stars",
    "Latitude",
    "Longitude",
  ],
  city: ["ID", "Name", "Description"],
};
