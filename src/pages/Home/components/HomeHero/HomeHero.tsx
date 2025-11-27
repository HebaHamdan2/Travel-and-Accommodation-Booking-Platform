import { Box, Stack, Typography } from "@mui/material";
import UserSearchBar from "../../../../components/UserSearchBar";
import Wrapper from "../../../../components/Wrapper";

const HomeHero = () => {
  return (
    <>
      <Wrapper>
        <Stack
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.8rem", sm: "4rem", md: "5.5rem" },
              textAlign: "left",
              alignSelf: "flex-start",
              maxWidth: "60rem",
              background:
                "linear-gradient(100deg, rgba(228,160,183,1) 20%, rgba(125,207,182,1) 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Explore your place to stay
          </Typography>
          <UserSearchBar />
          <Box
            sx={{
              alignSelf: "flex-end",
              textAlign: "left",
              maxWidth: "40rem",
              position: "relative",
              pl: "28px",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "4px",
                height: "100%",
                backgroundColor: "primary.main",
                borderRadius: "2px",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", md: "2.25rem" },
                color: "primary.main",
                fontWeight: 400,
              }}
            >
              We provide a variety of the best lodging accommodations for those
              of you who need it.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.5rem", sm: "0.625rem", md: "1.125rem" },
                color: "secondary.main",
                fontWeight: 700,
              }}
            >
              Don’t worry about the quality of the service.
            </Typography>
          </Box>
        </Stack>
      </Wrapper>
    </>
  );
};

export default HomeHero;
