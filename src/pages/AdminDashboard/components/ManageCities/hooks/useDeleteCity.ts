import { showNotification } from "@/features/notifications/notificationsSlice";
import { useDeleteCityMutation } from "../../../../../services/admin/cities";
import { useAppDispatch } from "@/app/hooks";

export const useDeleteCity = () => {
  const [deleteCity, { isLoading: isDeleting }] = useDeleteCityMutation();
  const dispatch = useAppDispatch();

  const handleConfirmDelete = async (cityId: number, cityName: string) => {
    if (!cityId) return;
    try {
      await deleteCity(cityId).unwrap();
      dispatch(
        showNotification({
          message: `${cityName}City deleted successfully!`,
          type: "success",
        })
      );
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return {
    handleConfirmDelete,
    isDeleting,
  };
};
