import { useAddCityMutation } from "../../../../../services/admin/cities";
import { useAppDispatch } from "@/app/hooks";
import { showNotification } from "@/features/notifications/notificationsSlice";

export const useAddCity = () => {
  const [addCity, { isLoading: isAdding }] = useAddCityMutation();
  const dispatch = useAppDispatch();

  const handleAddCity = async (
    name: string,
    description: string,
    resetFields?: () => void,
    resetPage?: () => void
  ) => {
    if (!name.trim() || !description.trim()) return;

    try {
      await addCity({ name, description }).unwrap();
      dispatch(
        showNotification({
          message: "City added successfully!",
          type: "success",
        })
      );
      resetFields?.();
      resetPage?.();
      return true;
    } catch (error: any) {
      return false;
    }
  };

  return {
    handleAddCity,
    isAdding,
  };
};
