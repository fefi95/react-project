import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
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
import { Profile } from "../components/Profile";
import { useAuthContext } from "../contexts/User";
import { saveUser, USER_KEYS } from "../services/storage";

const AuthorizationPage = (): JSX.Element => {
  const {
    user1S: [user1, setUser1],
    user2S: [user2, setUser2],
    token1S: [token1, setToken1],
    token2S: [token2, setToken2],
  } = useAuthContext();

  const setUser = async (
    token: string,
    userKey: typeof USER_KEYS.USER1 | typeof USER_KEYS.USER2,
    setUserFunc: React.Dispatch<React.SetStateAction<User | null>>,
    setTokenFunc: React.Dispatch<React.SetStateAction<string | null>>,
  ): Promise<void> => {
    const profile = await getProfile(token);
    setUserFunc(profile);
    setTokenFunc(token);
    saveUser(userKey, profile);
  };

  useEffect(() => {
    if (window.location.hash === "") {
      return;
    }

    const mToken = getTokenFromURL(window.location.hash);

    if (mToken && user1 == null && token1 == null) {
      setUser(mToken.access_token, USER_KEYS.USER1, setUser1, setToken1);
    } else if (mToken && user2 == null && token2 == null) {
      setUser(mToken.access_token, USER_KEYS.USER2, setUser2, setToken2);
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
            bg="rgba(255, 255, 255, 0.85)"
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
              <Button as="a" href={authorizationLink()} size="lg" w="full">
                Grant permissions for user 1
              </Button>
            )}
          </Box>
        </GridItem>

        <GridItem>
          <Box
            p={{ base: 5, md: 6 }}
            borderRadius="xl"
            bg="rgba(255, 255, 255, 0.85)"
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
              <Button as="a" href={authorizationLink()} size="lg" w="full">
                Grant permissions for user 2
              </Button>
            )}
          </Box>
        </GridItem>
      </Grid>

      {user1 !== null && user2 !== null ? (
        <Box>
          <Button
            as="a"
            href="/matching_tracks"
            size="lg"
            px="8"
            bg="accent.500"
            _hover={{ bg: "accent.600" }}
          >
            Check matching tracks
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default AuthorizationPage;
