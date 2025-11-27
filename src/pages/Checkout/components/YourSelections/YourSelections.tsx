import { Typography, Stack, Grid } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { SelectionsProps } from "../../types";
import CartItemCard from "@/components/Cards/CartItemCard";
const YourSelections: React.FC<SelectionsProps> = ({ cartItem }) => {
  const totalCost = useAppSelector((state) => state.cart.totalPrice);
  return (
    <Stack spacing={3}>
      <Stack key={cartItem.hotelName} spacing={2}>
        <Stack
          direction="row"
          gap="1rem"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6">{cartItem.hotelName}</Typography>
          <Typography variant="h6" color="primary">
            Total Cost: ${totalCost.toFixed(2)}
          </Typography>
        </Stack>
        <Grid container spacing={3} justifyContent="center">
          {cartItem.rooms?.map((room) => (
            <Grid key={room.roomId}>
              <CartItemCard
                data={{
                  ...room,
                  hotelName: cartItem.hotelName,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default YourSelections;
