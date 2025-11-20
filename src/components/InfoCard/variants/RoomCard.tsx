import React, { useState } from "react";
import { BaseCardProps, RoomCardInfo } from "../types";
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
import { baseCardStyles } from "../styles/baseCardStyles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addRoomToCart,
  removeFromCart,
} from "../../../features/cart/cartSlice";
import { showNotification } from "../../../features/notifications/notificationsSlice";
import GenericDialog from "@/components/GenericDialog";

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
  const cartItems = useAppSelector((state) => state.cart.items);

  // Check if the room is already in the cart
  const isInCart = cartItems.some(
    (hotel) =>
      hotel.hotelName === hotelName &&
      hotel.rooms.some((room) => room.roomId === roomId)
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  function confirmDelete() {
    dispatch(removeFromCart({ hotelName, roomNumber: roomNumber }));
    dispatch(
      showNotification({ message: "Room Removed from cart", type: "success" })
    );
    setOpenDeleteDialog(false);
  }
  const handleToggleCart = () => {
    if (isInCart) {
      setOpenDeleteDialog(true);
    } else {
      dispatch(
        addRoomToCart({
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
        })
      );
      dispatch(
        showNotification({
          message: "Room added to your cart successfully",
          type: "success",
        })
      );
    }
  };

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
      <GenericDialog
        open={openDeleteDialog}
        variant="delete"
        confirmText="Remove Room"
        onConfirm={confirmDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
};

export default RoomCard;
