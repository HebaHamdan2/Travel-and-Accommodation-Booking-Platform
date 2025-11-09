import { Box, Container, Skeleton } from "@mui/material";

const SearchResultsSkeleton = () => {
    return (
       <Container maxWidth="xl" sx={{ mt: "4rem" }}>
    <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
      <Box
        sx={{
          width: { xs: "0%", md: "30%" },
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={500} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 3 }} />
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={260}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  </Container>
    );
}

export default SearchResultsSkeleton;
