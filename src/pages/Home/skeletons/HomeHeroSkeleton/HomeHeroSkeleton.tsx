import { Skeleton, Stack } from "@mui/material";
import Wrapper from "../../../../components/Wrapper";

const HomeHeroSkeleton = () => (
  <Wrapper>
    <Stack spacing={4} alignItems="center">
      <Skeleton variant="text" width="60%" height={64} />
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Skeleton variant="text" width="80%" height={32} />
    </Stack>
  </Wrapper>
);

export default HomeHeroSkeleton;
