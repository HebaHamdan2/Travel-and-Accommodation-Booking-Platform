import { createApi } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/constans";
import { createBaseQueryWithErrorHandler } from "../baseQueryWithErrorHandler";
import { RoomBodyRequest } from "../../types";

const baseQuery = createBaseQueryWithErrorHandler(`${baseURL}/api/rooms`);
export const adminroomsApi = createApi({
  reducerPath: "adminroomsApi",
  baseQuery,
  tagTypes: ["AdminRooms"],
  endpoints: (builder) => ({
    updateRoom: builder.mutation<
      void,
      { roomId: number; room: RoomBodyRequest }
    >({
      query: ({ roomId, room }) => ({
        url: `/${roomId}`,
        method: "PUT",
        body: room,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["AdminRooms"],
    }),
  }),
});
export const { useUpdateRoomMutation } = adminroomsApi;
