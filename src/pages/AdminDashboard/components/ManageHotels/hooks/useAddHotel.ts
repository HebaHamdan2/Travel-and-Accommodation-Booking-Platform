import { useAddHotelByCityIdMutation } from "../../../../../services/admin/cities";
import { AdminHotel } from "../../../../../types";
import { useAppDispatch } from "@/app/hooks";
import { showNotification } from "@/features/notifications/notificationsSlice";

export const useAddHotel = () => {
  const [addHotel, { isLoading }] = useAddHotelByCityIdMutation();
  const dispatch = useAppDispatch();

  const handleAddHotel = async (
    cityId: number | '',
    hotel: Omit<AdminHotel, "id">,
    resetFields?: () => void
  ) => {
    try {
      await addHotel({ cityId: Number(cityId), hotel }).unwrap();
      dispatch(
        showNotification({
          message: "Hotel added successfully!",
          type: "success",
        })
      );
      resetFields?.();
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return { handleAddHotel, isLoading };
};
