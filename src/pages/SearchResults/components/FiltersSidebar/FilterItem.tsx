import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { FilterItemProps } from "../../types";

const FilterItem: React.FC<FilterItemProps> = ({ title, children }) => {
  return (
    <>
      <Box sx={{ mx: "1.25rem", textAlign: "left" }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        {children}
      </Box>
      <Divider sx={{ my: 3 }} />
    </>
  );
};

export default FilterItem;
