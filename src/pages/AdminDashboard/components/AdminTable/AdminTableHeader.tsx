import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AdminTableHeaderProps } from "./types";
export function AdminTableHeader({
  search,
  onSearch,
  pageSize,
  onPageSizeChange,
  title,
  onAddClick,
}: AdminTableHeaderProps) {
  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "none",
      }}
    >
      <TextField
        label={`Search by ${title}`}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ flex: 1 }}
      />

      <FormControl sx={{ width: 120 }}>
        <InputLabel>Limit</InputLabel>
        <Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          label="Limit"
        >
          {[5, 10, 15, 20].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        startIcon={<AddIcon />}
        sx={{
          textTransform: "none",
          borderRadius: 2,
          py: "0.9rem",
          px: 3,
          fontWeight: 600,
          bgcolor: "primary.main",
        }}
        variant="contained"
        onClick={onAddClick}
      >
        Add {title}
      </Button>
    </Box>
  );
}
