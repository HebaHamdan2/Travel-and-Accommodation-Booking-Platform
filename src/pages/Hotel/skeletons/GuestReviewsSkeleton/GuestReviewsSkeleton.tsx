import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Wrapper from "../../../../components/Wrapper";

const GuestReviewsSkeleton = () => {
  return (
    <Wrapper>
      <Typography
        variant="h2"
        fontWeight={600}
        fontSize="2rem"
        color="text.primary"
        mb={3}
      >
        Guest Reviews
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {Array.from(new Array(4)).map((_, i) => (
          <Grid key={i}>
            <Card
              sx={{
                height: "100%",
                width: "32rem",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                p: 2,
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={25}
                    animation="wave"
                  />
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Skeleton
                      variant="circular"
                      width={18}
                      height={18}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width={30}
                      height={20}
                      animation="wave"
                    />
                  </Stack>
                </Stack>
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={20}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="85%"
                  height={20}
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

export default GuestReviewsSkeleton;
