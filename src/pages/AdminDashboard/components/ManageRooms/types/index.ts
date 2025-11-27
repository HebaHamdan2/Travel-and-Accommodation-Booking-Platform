import { RoomBodyRequest } from "@/types";
interface RoomDialogs {
  open: boolean;
  onClose: () => void;
}
export interface AddRoomProps extends RoomDialogs {
  onSubmit: (room: RoomBodyRequest) => Promise<boolean>;
}
export interface DeleteRoomProps extends RoomDialogs {
  hotelId: number;
  roomId: number | null;
  onConfirm: (hotelId: number, roomId: number) => void;
}
export interface UpdateRoomProps extends RoomDialogs {
  selectedRoom: RoomBodyRequest | null;
  onSubmit: (room: RoomBodyRequest) => Promise<boolean>;
}
