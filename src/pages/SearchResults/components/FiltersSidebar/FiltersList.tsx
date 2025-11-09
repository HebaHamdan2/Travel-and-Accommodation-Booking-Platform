import { Box, Chip, Rating, Slider, Stack, Typography } from "@mui/material";
import { useGetAmenitiesQuery } from "../../../../services/searchResults";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getRoomTypes } from "../../utils/roomTypes";
import FilterItem from "./FilterItem";
import {
  setPriceRange,
  setRating,
  toggleAmenity,
  toggleRoomType,
} from "../../../../features/filters/filtersSlice";

const FiltersList = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { data: amenities, isLoading } = useGetAmenitiesQuery();
  const searchResults = useAppSelector((state) => state.search.results);
  const roomTypes = getRoomTypes(searchResults);
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
          value={filters.priceRange}
          onChange={(_, newValue) =>
            dispatch(setPriceRange(newValue as number[]))
          }
          valueLabelDisplay="auto"
          min={0}
          max={800}
          sx={{
            color: "secondary.main",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>${filters.priceRange[0]}</Typography>
          <Typography>${filters.priceRange[1]}</Typography>
        </Box>
      </FilterItem>
      <FilterItem title="Star Rating">
        <Rating
          name="rating"
          value={filters.rating}
          onChange={(_, newValue) => dispatch(setRating(newValue))}
          sx={{ mt: 1, color: "star" }}
        />
      </FilterItem>
      <FilterItem title="Amenities">
        {isLoading ? (
          <Typography>Loading amenities...</Typography>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
            {amenities?.map((item) => (
              <Chip
                key={item.name}
                label={item.name}
                variant={
                  filters.amenities.includes(item.name) ? "filled" : "outlined"
                }
                color={
                  filters.amenities.includes(item.name)
                    ? "secondary"
                    : "default"
                }
                onClick={() => dispatch(toggleAmenity(item.name))}
              />
            ))}
          </Stack>
        )}
      </FilterItem>
      <FilterItem title="Room Type">
        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
          {roomTypes?.map((type) => (
            <Chip
              key={type}
              label={type}
              variant={filters.roomTypes.includes(type) ? "filled" : "outlined"}
              color={filters.roomTypes.includes(type) ? "secondary" : "default"}
              onClick={() => dispatch(toggleRoomType(type))}
            />
          ))}
        </Stack>
      </FilterItem>
    </Box>
  );
};

export default FiltersList;
