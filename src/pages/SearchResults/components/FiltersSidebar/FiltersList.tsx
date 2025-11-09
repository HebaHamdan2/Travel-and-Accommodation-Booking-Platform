import { Box, Chip, Rating, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useGetAmenitiesQuery } from "../../../../services/searchResults";
import { useAppSelector } from "../../../../app/hooks";
import { getRoomTypes } from "../../utils/roomTypes";
import FilterItem from "./FilterItem";

const FiltersList = () => {
  const [price, setPrice] = useState<number[]>([0, 1000]);
  const { data: amenities } = useGetAmenitiesQuery();
  const [rating, setRating] = useState<number | null>(2);
  const searchResults = useAppSelector((state) => state.search.results);
  const roomTypes = getRoomTypes(searchResults);
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    const value = newValue as number[];
    setPrice(value);
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          my: "1rem",
          borderBottom: "2px solid",
          borderColor: "divider",
          fontWeight: 500,
        }}
      >
        Filters
      </Typography>
      <FilterItem title="Price Range">
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{
            color: "secondary.main",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>${price[0]}</Typography>
          <Typography>${price[1]}</Typography>
        </Box>
      </FilterItem>
      <FilterItem title="Star Rating">
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          sx={{ mt: 1 ,color:"star"}}
        />
      </FilterItem>
      <FilterItem title="Amenities">
        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
          {amenities?.map((item) => (
            <Chip
              key={item.name}
              label={item.name}
              variant="outlined"
              clickable
            />
          ))}
        </Stack>
      </FilterItem>
      <FilterItem title="Room Type">
        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
          {roomTypes?.map((type) => (
            <Chip key={type} label={type} variant="outlined" clickable />
          ))}
        </Stack>
      </FilterItem>
    </Box>
  );
};

export default FiltersList;
