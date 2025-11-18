import { useAppDispatch } from "@/app/hooks";
import { useDeleteHotelRoomMutation } from "../../../../../services/admin/hotels";
import { showNotification } from "@/features/notifications/notificationsSlice";

export const useDeleteRoom = () => {
  const [deleteRoom, { isLoading }] = useDeleteHotelRoomMutation();
  const dispatch = useAppDispatch();

  const handleDeleteRoom = async (hotelId: number, roomId: number) => {
    try {
      await deleteRoom({ hotelId, roomId }).unwrap();
      dispatch(
        showNotification({
          message: "Room deleted successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return { handleDeleteRoom, isLoading };
};
