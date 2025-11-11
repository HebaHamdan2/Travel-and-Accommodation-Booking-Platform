import { Box, Skeleton, Stack } from "@mui/material";
const VisualGallerySkeleton = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: "40rem", mx: "auto" }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={260}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          mb: 1.5,
        }}
      />
      <Stack direction="row" spacing={1}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width="100%"
            height={90}
            sx={{
              flex: 1,
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default VisualGallerySkeleton;
