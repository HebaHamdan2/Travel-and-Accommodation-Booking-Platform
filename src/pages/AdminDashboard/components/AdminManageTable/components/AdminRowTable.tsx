import { AdminHotel, AvailbleRoom } from "@/types";
import { Chip, Rating, TableCell } from "@mui/material";
import { HOTEL_TYPE_LABELS } from "../../../constans";
import React from "react";
import { AdminRowTableProps } from "../../components/AdminTable/types";

const AdminRowTable: React.FC<AdminRowTableProps> = ({ variant, row }) => {
  if (variant === "room") {
    const r: AvailbleRoom = row;
    return (
      <>
        <TableCell>{r.roomId}</TableCell>
        <TableCell>{r.roomNumber}</TableCell>
        <TableCell>{r.roomType}</TableCell>
        <TableCell>{r.capacityOfAdults}</TableCell>
        <TableCell>{r.capacityOfChildren}</TableCell>
        <TableCell>{r.roomAmenities.map((a) => a.name).join(", ")}</TableCell>
        <TableCell>{r.price}</TableCell>
        <TableCell>
          <Chip
            label={r.availability ? "Available" : "Not Available"}
            color={r.availability ? "success" : "error"}
            size="small"
            variant="outlined"
          />
        </TableCell>
      </>
    );
  }

  if (variant === "hotel") {
    const h: AdminHotel = row;
    return (
      <>
        <TableCell>{h.id}</TableCell>
        <TableCell>{h.name}</TableCell>
        <TableCell>{h.description}</TableCell>
        <TableCell>{HOTEL_TYPE_LABELS[h.hotelType]}</TableCell>
        <TableCell>
          <Rating value={h.starRating} readOnly sx={{ color: "star" }} />
        </TableCell>
        <TableCell>
          <Chip
            label={h.latitude}
            size="small"
            variant="outlined"
            color="primary"
          />
        </TableCell>
        <TableCell>
          <Chip
            label={h.longitude}
            size="small"
            variant="outlined"
            color="secondary"
          />
        </TableCell>
      </>
    );
  }
  // city
  return (
    <>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.description}</TableCell>
    </>
  );
};

export default AdminRowTable;
