import { useAddHotelRoomMutation } from "../../../../../services/admin/hotels";
import { RoomBodyRequest } from "../../../../../types";
import { showNotification } from "@/features/notifications/notificationsSlice";
import { useAppDispatch } from "@/app/hooks";

export const useAddRoom = () => {
  const [addRoom, { isLoading }] = useAddHotelRoomMutation();
  const dispatch = useAppDispatch();
  const handleAddRoom = async (hotelId: number, room: RoomBodyRequest) => {
    try {
      await addRoom({ hotelId, room }).unwrap();
      dispatch(
        showNotification({
          message: "Room added successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return { handleAddRoom, isLoading };
};
