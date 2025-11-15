import { AdminHotel } from "../../../../../types";
interface Dialog {
  open: boolean;
  onClose: () => void;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}
export interface AddHotelDialogProps extends Dialog {
  cities: { id: number; name: string }[];
}
export interface UpdateHotelDialogProps extends Dialog {
  hotel: AdminHotel | null;
}
export interface DeleteHotelDialogProps extends Dialog {
  hotelId: number;
  cityId: number;
}
