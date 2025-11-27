import { useAppDispatch } from "@/app/hooks";
import { showNotification } from "@/features/notifications/notificationsSlice";
import { useUpdateCityMutation } from "@/services/admin/cities";

export const useUpdateCity = () => {
  const [updateCity, { isLoading: isUpdating }] = useUpdateCityMutation();
  const dispatch = useAppDispatch();

  const handleUpdate = async (
    cityId: number,
    name: string,
    description: string
  ) => {
    try {
      await updateCity({
        cityId,
        city: { name, description },
      }).unwrap();
      dispatch(
        showNotification({
          message: "City updated successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err) {
      return false;
    }
  };

  return {
    handleUpdate,
    isUpdating,
  };
};
