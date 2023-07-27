import { Box, Button, Flex, Heading, Link, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import {
  type User,
  authorizationLink,
  getProfile,
  getTokenFromURL,
} from "../services/spotify";
import Profile from "../components/Profile";
import { User1Context, User2Context } from "../contexts/User";

const AuthorizationPage = (): JSX.Element => {
  const USER1 = "USER1";
  const USER2 = "USER2";

  const [user1, setUser1] = useContext(User1Context);
  const [user2, setUser2] = useContext(User2Context);

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
  });

  return (
    <VStack direction="row">
      <Flex alignItems="center" justifyContent="center">
        <Heading as="h1" py="5">
          Log in to Spotify
        </Heading>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Box w="25vw" h="50vh" p="5" bg="coral">
          {user1 != null ? (
            <Profile user={user1}></Profile>
          ) : (
            <Link href={authorizationLink()} target="popup">
              <Button>Grant permissions for user 1</Button>
            </Link>
          )}
        </Box>
        <Box w="25vw" h="50vh" p="5" bg="purple">
          {user2 != null ? (
            <Profile user={user2}></Profile>
          ) : (
            <Link href={authorizationLink()} target="popup">
              <Button>Grant permissions for user 2</Button>
            </Link>
          )}
        </Box>
      </Flex>
      {user1 !== null && user2 !== null ? (
        <Link href="/matching_tracks">Check matching tracks</Link>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default AuthorizationPage;
