import { Typography, Stack, Grid } from "@mui/material";
import InfoCard from "../../../../components/InfoCard";
import React from "react";
import { CartItem } from "../../../../features/types";
import { selectTotalCost } from "../../../../features/cart/selectTotalCost";
import { useAppSelector } from "../../../../app/hooks";
export interface SelectionsProps {
  cartItem: CartItem;
}
const YourSelections: React.FC<SelectionsProps> = ({ cartItem }) => {
  const totalCost = useAppSelector(selectTotalCost);
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
              <InfoCard
                key={room.roomId}
                variant="cartItem"
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
