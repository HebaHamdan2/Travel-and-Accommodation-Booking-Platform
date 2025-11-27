import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { CartRoomItem } from "@/features/types";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import WarningDialog from "@/components/Dialogs/WarningDialog";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  addRoomToCart,
  clearCart,
  removeFromCart,
} from "@/features/cart/cartSlice";
import { showNotification } from "@/features/notifications/notificationsSlice";
import { BaseCardProps, RoomCardInfo } from "./types";
import { baseCardStyles } from "./styles/baseCardStyles";

const RoomCard: React.FC<BaseCardProps<RoomCardInfo>> = ({ data }) => {
  const {
    hotelName,
    checkInDate,
    checkOutDate,
    roomId,
    roomNumber,
    roomType,
    roomPhotoUrl,
    price,
    capacityOfAdults,
    capacityOfChildren,
    roomAmenities,
  } = data;

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [openConflictDialog, setOpenConflictDialog] = useState(false);
  const [pendingRoom, setPendingRoom] = useState<null | {
    hotelName: string;
    checkInDate: string;
    checkOutDate: string;
    room: CartRoomItem;
  }>(null);
  // Check if the room is already in the cart
  const isInCart = cart?.rooms?.some((room) => room.roomId === roomId) ?? false;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  function confirmDelete() {
    dispatch(removeFromCart({ hotelName, roomNumber: roomNumber }));
    dispatch(
      showNotification({ message: "Room Removed from cart", type: "success" })
    );
    setOpenDeleteDialog(false);
  }
  const isDifferentHotel = cart?.hotelName && cart?.hotelName !== hotelName;

  const isDifferentDates =
    cart?.checkInDate &&
    cart?.checkOutDate &&
    (cart.checkInDate !== checkInDate || cart.checkOutDate !== checkOutDate);

  const hasConflict = isDifferentHotel || isDifferentDates;

  function addRoom(roomInfo: any) {
    dispatch(addRoomToCart(roomInfo));
    dispatch(
      showNotification({
        message: "Room added to your cart successfully",
        type: "success",
      })
    );
  }

  const handleToggleCart = () => {
    if (isInCart) {
      setOpenDeleteDialog(true);
      return;
    }
    // different hotel or dates => conflict dialog
    if ((cart.rooms?.length ?? 0) > 0 && hasConflict) {
      setPendingRoom({
        hotelName,
        checkInDate,
        checkOutDate,
        room: {
          roomId,
          roomNumber,
          roomType,
          roomPhotoUrl,
          price,
        },
      });
      setOpenConflictDialog(true);
      return;
    }
    // normal add
    addRoom({
      hotelName,
      checkInDate,
      checkOutDate,
      room: {
        roomId,
        roomNumber,
        roomType,
        roomPhotoUrl,
        price,
      },
    });
  };

  function confirmReplaceCart() {
    dispatch(clearCart());
    addRoom(pendingRoom!);
    setOpenConflictDialog(false);
    setPendingRoom(null);
  }

  return (
    <>
      <Card
        sx={{
          ...baseCardStyles,
          maxWidth: "25rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              image={roomPhotoUrl}
              alt={`room-${roomId}`}
              sx={{ height: 250, objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "/not-found.jpg"; // fallback image
              }}
            />
          </Box>
          <CardContent sx={{ px: 3, pb: 2, textAlign: "left" }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.5, color: "text.secondary" }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 1,
                }}
              >
                {roomType}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "1.3rem",
                  }}
                >
                  ${data.price.toFixed(2)}
                  <Typography
                    component="span"
                    sx={{
                      color: "secondary.main",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      ml: 0.5,
                    }}
                  >
                    per night
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 1.5, color: "text.secondary" }}
            >
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <PersonIcon fontSize="small" />
                <Typography variant="body2">
                  {capacityOfAdults} Adults
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <ChildCareIcon fontSize="small" />
                <Typography variant="body2">
                  {capacityOfChildren} Children
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {roomAmenities?.map((item) => (
                <Chip
                  key={item.name}
                  label={item.name}
                  size="small"
                  variant="filled"
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "background.default",
                    opacity: 0.8,
                  }}
                />
              ))}
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            size="medium"
            variant={isInCart ? "outlined" : "contained"}
            color={isInCart ? "secondary" : "primary"}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "1rem",
              px: 4,
              "&:hover": { opacity: 0.9, transform: "scale(1.03)" },
              transition: "all 0.2s ease-in-out",
            }}
            onClick={handleToggleCart}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
        </CardActions>
      </Card>
      <DeleteDialog
        open={openDeleteDialog}
        onConfirm={confirmDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
      <WarningDialog
        open={openConflictDialog}
        message="You already selected rooms from a different hotel or with different dates. Starting a new booking will clear your existing selections."
        onConfirm={confirmReplaceCart}
        onClose={() => setOpenConflictDialog(false)}
      />
    </>
  );
};

export default RoomCard;
