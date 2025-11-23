import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminTableBodyProps } from "./types";
import { ADMIN_HEADERS } from "../../constans";
import AdminRowTable from "./AdminRowTable";
const AdminTableBody: React.FC<AdminTableBodyProps> = ({
  variant,
  data,
  loading = false,
  onRowClick,
  onDelete,
}) => {
  const colSpan = ADMIN_HEADERS[variant].length + (onDelete ? 1 : 0);
  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "primary.main" }}>
          {ADMIN_HEADERS[variant].map((label) => (
            <TableCell key={label}>{label}</TableCell>
          ))}
          {onDelete && <TableCell align="center">Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={colSpan} align="center">
              <CircularProgress size={24} />
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={colSpan} align="center">
              No data found.
            </TableCell>
          </TableRow>
        ) : (
          data.map((row) => (
            <TableRow
              key={row.id ?? row.roomId}
              hover
              sx={{ cursor: onRowClick ? "pointer" : "default" }}
              onClick={() => onRowClick?.(row)}
            >
              <AdminRowTable row={row} variant={variant} />

              {onDelete && (
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AdminTableBody;
