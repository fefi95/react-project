import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
  type User,
  authorizationLink,
  getProfile,
  getTokenFromURL,
} from "../services/spotify";
import Profile from "../components/Profile";
import { useAuthContext } from "../contexts/User";

const AuthorizationPage = (): JSX.Element => {
  const USER1 = "USER1";
  const USER2 = "USER2";

  const {
    user1S: [user1, setUser1],
    user2S: [user2, setUser2],
  } = useAuthContext();

  const setUser = async (
    token: string,
    user: string,
    setUserFunc: React.Dispatch<React.SetStateAction<User | null>>,
  ): Promise<void> => {
    const u1 = await getProfile(token);
    setUserFunc(u1);
    localStorage.setItem(user, JSON.stringify(u1));
  };

  useEffect(() => {
    if (window.location.hash === "") {
      return;
    }

    const mToken = getTokenFromURL(window.location.hash);

    if (mToken && user1 == null) {
      setUser(mToken.access_token, USER1, setUser1);
    } else if (mToken && user2 == null) {
      setUser(mToken.access_token, USER2, setUser2);
    }

    window.location.hash = "";
  }, []);

  return (
    <Stack spacing={{ base: 5, md: 7 }}>
      <Heading as="h1" size={{ base: "lg", md: "xl" }}>
        Log in to Spotify
      </Heading>

      <Text color="ink.700" maxW="2xl">
        Connect two accounts to compare their top tracks and reveal your shared
        music DNA.
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="5">
        <GridItem>
          <Box
            p={{ base: 5, md: 6 }}
            borderRadius="xl"
            bg="whiteAlpha.850"
            border="2px solid"
            borderColor="brand.200"
            boxShadow="card"
            minH="320px"
          >
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.08em"
              color="ink.600"
              textTransform="uppercase"
              mb="3"
            >
              Listener 1
            </Text>
          {user1 != null ? (
            <Profile user={user1}></Profile>
          ) : (
            <Link href={authorizationLink()}>
              <Button size="lg" w="full">
                Grant permissions for user 1
              </Button>
            </Link>
          )}
          </Box>
        </GridItem>

        <GridItem>
          <Box
            p={{ base: 5, md: 6 }}
            borderRadius="xl"
            bg="whiteAlpha.850"
            border="2px solid"
            borderColor="accent.200"
            boxShadow="card"
            minH="320px"
          >
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="0.08em"
              color="ink.600"
              textTransform="uppercase"
              mb="3"
            >
              Listener 2
            </Text>
          {user2 != null ? (
            <Profile user={user2}></Profile>
          ) : (
            <Link href={authorizationLink()}>
              <Button size="lg" w="full">
                Grant permissions for user 2
              </Button>
            </Link>
          )}
          </Box>
        </GridItem>
      </Grid>

      {user1 !== null && user2 !== null ? (
        <Box>
          <Link href="/matching_tracks">
            <Button size="lg" px="8" bg="accent.500" _hover={{ bg: "accent.600" }}>
              Check matching tracks
            </Button>
          </Link>
        </Box>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default AuthorizationPage;
