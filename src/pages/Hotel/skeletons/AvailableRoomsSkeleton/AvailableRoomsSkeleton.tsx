import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Wrapper from "../../../../components/Wrapper";

const AvailableRoomsSkeleton = () => {
  return (
    <Wrapper>
      <Typography
        variant="h2"
        fontWeight={600}
        fontSize="2rem"
        color="text.primary"
        mb={3}
      >
        Available Rooms
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {Array.from(new Array(3)).map((_, index) => (
          <Grid key={index}>
            <Card
              sx={{
                width: 380,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <Skeleton variant="rectangular" height={250} animation="wave" />
              <CardContent>
                <Skeleton
                  variant="text"
                  width="60%"
                  height={30}
                  sx={{ mb: 1.5 }}
                  animation="wave"
                />
                <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                  <Skeleton variant="text" width={80} animation="wave" />
                  <Skeleton variant="text" width={80} animation="wave" />
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={24}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rounded"
                    width={70}
                    height={24}
                    animation="wave"
                  />
                  <Skeleton
                    variant="rounded"
                    width={50}
                    height={24}
                    animation="wave"
                  />
                </Box>
                <Skeleton
                  variant="text"
                  width="40%"
                  height={30}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width="60%"
                  height={40}
                  sx={{ mt: 2, borderRadius: 2 }}
                  animation="wave"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default AvailableRoomsSkeleton;
