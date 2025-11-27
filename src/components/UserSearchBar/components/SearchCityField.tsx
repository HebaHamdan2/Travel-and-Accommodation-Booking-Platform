import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { SearchCityFieldProps } from "../types";
const SearchCityField: React.FC<SearchCityFieldProps> = ({ value, update }) => (
  <TextField
    placeholder="Search cities..."
    value={value}
    onChange={(e) => update("city", e.target.value)}
    size="small"
    fullWidth
    variant="outlined"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{
      width: "100%",
      maxWidth: 1200,
      display: "flex",
      flexWrap: "wrap",
      gap: { xs: 1.5, sm: 1 },
      justifyContent: "center",
      alignItems: "center",
      mx: "auto",
      p: { xs: 1, sm: 0 },
    }}
  />
);

export default SearchCityField;
