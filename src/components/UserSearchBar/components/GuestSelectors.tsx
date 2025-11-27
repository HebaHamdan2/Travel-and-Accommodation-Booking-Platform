import { adultsOptions, childrenOptions, roomsOptions } from "@/utils/constans";
import { Box } from "@mui/material";
import SelectField from "./SelectField";
import React from "react";
import { GuestSelectorsProps } from "../types";

const GuestSelectors: React.FC<GuestSelectorsProps> = ({
  adults,
  children,
  rooms,
  update,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flex: { xs: "0 0 100%", sm: "0 0 auto", md: 1.5 },
        minWidth: { xs: "100%", sm: 300 },
        justifyContent: "space-between",
      }}
    >
      <SelectField
        label="Adults"
        value={adults}
        list={adultsOptions}
        onChange={(v) => update("adults", v)}
      />
      <SelectField
        label="Children"
        value={children}
        list={childrenOptions}
        onChange={(v) => update("children", v)}
      />
      <SelectField
        label="Rooms"
        value={rooms}
        list={roomsOptions}
        onChange={(v) => update("numberOfRooms", v)}
      />
    </Box>
  );
};
export default GuestSelectors;
