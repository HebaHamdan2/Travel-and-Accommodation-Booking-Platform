import { CartRoomItem } from "../../../features/types";
import { AvailbleRoom } from "../../../types";
export interface RoomCardInfo extends AvailbleRoom {
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
}
export interface CartRoomItemCardIfo extends CartRoomItem {
  hotelName: string;
}
export interface BaseCardProps<T> {
  data: T;
}