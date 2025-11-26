import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { AdminPaginationProps } from "../types";
const AdminTablePagination: React.FC<AdminPaginationProps> = ({
  page,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      mt={3}
      spacing={2}
    >
      <Button
        variant="contained"
        disabled={!hasPrev}
        onClick={onPrev}
        sx={{ textTransform: "none" }}
      >
        Prev
      </Button>

      <Typography>Page {page}</Typography>

      <Button
        variant="contained"
        disabled={!hasNext}
        onClick={onNext}
        sx={{ textTransform: "none" }}
      >
        Next
      </Button>
    </Stack>
  );
};

export default AdminTablePagination;
