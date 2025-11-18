import { AdminHotel } from "../../../../../types";
interface Dialog {
  open: boolean;
  onClose: () => void;
}
export interface AddHotelDialogProps extends Dialog {
  cities: { id: number; name: string }[];
  onSubmit: (
    values: Omit<AdminHotel, "id">,
    cityId: number | "",
    resetFields?: () => void
  ) => Promise<boolean>;
}
export interface UpdateHotelDialogProps extends Dialog {
  hotel: AdminHotel | null;
  onSubmit: (
    hotelId: number,
    hotel: Omit<AdminHotel, "id">
  ) => Promise<boolean>;
}
export interface DeleteHotelDialogProps extends Dialog {
  hotelId: number;
  cityId: number;
  onConfirm: (hotelId: number, cityId: number) => void;
}
