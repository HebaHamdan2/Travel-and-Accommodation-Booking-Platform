import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { SearchButtonProps } from "../types";

const SearchButton: React.FC<SearchButtonProps> = ({ loading, onSearch }) => (
  <Button
    variant="contained"
    startIcon={<SearchIcon />}
    onClick={onSearch}
    disabled={loading}
    sx={{
      minWidth: 120,
      textTransform: "none",
      height: 40,
      borderRadius: 1,
    }}
  >
    {loading ? "Searching..." : "Search"}
  </Button>
);

export default SearchButton;
