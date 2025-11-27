import { RoomBodyRequest } from "../../../../../types";
import { useUpdateRoomMutation } from "../../../../../services/admin/rooms";
import { useAppDispatch } from "@/app/hooks";
import { showNotification } from "@/features/notifications/notificationsSlice";

export const useUpdateRoom = () => {
  const [updateRoom, { isLoading }] = useUpdateRoomMutation();
  const dispatch = useAppDispatch();
  const handleUpdateRoom = async (roomId: number, room: RoomBodyRequest) => {
    try {
      await updateRoom({ roomId, room }).unwrap();
      dispatch(
        showNotification({
          message: "Room updated successfully!",
          type: "success",
        })
      );
      return true;
    } catch (err: any) {
      return false;
    }
  };

  return { handleUpdateRoom, isLoading };
};
