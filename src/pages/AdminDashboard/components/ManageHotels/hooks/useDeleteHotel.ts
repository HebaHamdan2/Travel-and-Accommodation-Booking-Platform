import { showNotification } from "@/features/notifications/notificationsSlice";
import { useDeleteHotelByCityIdMutation } from "../../../../../services/admin/cities";
import { useAppDispatch } from "@/app/hooks";

export const useDeleteHotel = () => {
  const [deleteHotel, { isLoading }] = useDeleteHotelByCityIdMutation();
  const dispatch = useAppDispatch();

  const handleDeleteHotel = async (cityId: number, hotelId: number) => {
    if (!cityId) return;
    try {
      await deleteHotel({ cityId, hotelId }).unwrap();
      dispatch(
        showNotification({
          message: `Hotel deleted successfully!`,
          type: "success",
        })
      );
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return { handleDeleteHotel, isLoading };
};
