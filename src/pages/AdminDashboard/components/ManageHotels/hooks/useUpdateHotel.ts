
import { useAppDispatch } from "@/app/hooks";
import { showNotification } from "@/features/notifications/notificationsSlice";
import { useUpdateHotelMutation } from "@/services/admin/hotels";
import { AdminHotel } from "@/types";

export const useUpdateHotel = () => {
  const [updateHotel, { isLoading }] = useUpdateHotelMutation();
  const dispatch = useAppDispatch();

  const handleUpdateHotel = async (hotelId: number, hotel: Omit<AdminHotel,"id">) => {
    try {
      await updateHotel({ hotelId, hotel }).unwrap();
      dispatch(
        showNotification({
          message: "Hotel updated successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return { handleUpdateHotel, isLoading };
};
