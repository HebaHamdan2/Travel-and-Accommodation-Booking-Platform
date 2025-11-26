import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { showNotification } from "@/features/notifications/notificationsSlice";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import { BaseCardProps, CartRoomItemCardIfo } from "./types";
import { useAppDispatch } from "@/app/hooks";
import { removeFromCart } from "@/features/cart/cartSlice";
import { baseCardStyles } from "./styles/baseCardStyles";

const CartItemCard: React.FC<BaseCardProps<CartRoomItemCardIfo>> = ({
  data,
}) => {
  const dispatch = useAppDispatch();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  function confirmDelete() {
    dispatch(
      removeFromCart({ hotelName: data.hotelName, roomNumber: data.roomNumber })
    );
    dispatch(
      showNotification({ message: "Room Removed from cart", type: "success" })
    );
    setOpenDeleteDialog(false);
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
              image={data.roomPhotoUrl}
              alt={`room-${data.roomId}`}
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
                {data.roomType}
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
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "1rem",
              px: 4,
              "&:hover": { opacity: 0.9, transform: "scale(1.03)" },
              transition: "all 0.2s ease-in-out",
            }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Remove From Cart
          </Button>
        </CardActions>
      </Card>
      <DeleteDialog
        open={openDeleteDialog}
        onConfirm={confirmDelete}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
};

export default CartItemCard;
