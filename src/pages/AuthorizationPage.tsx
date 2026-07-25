<<<<<<< HEAD
import { Box, Button, Flex, Heading, Link, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
=======
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { useEffect } from "react";
>>>>>>> origin/TASK-02-get-matching-tracks
import {
  type User,
  authorizationLink,
  getProfile,
  getTokenFromURL,
} from "../services/spotify";
import Profile from "../components/Profile";
<<<<<<< HEAD
=======
import { useAuthContext } from "../contexts/User";
>>>>>>> origin/TASK-02-get-matching-tracks

const AuthorizationPage = (): JSX.Element => {
  const USER1 = "USER1";
  const USER2 = "USER2";

<<<<<<< HEAD
  const getUser = (user: string): User | null => {
    const u1 = localStorage.getItem(user);
    return u1 !== null ? JSON.parse(u1) : null;
  };

  const [user1, setUser1] = useState<User | null>(getUser(USER1) || null);
  const [user2, setUser2] = useState<User | null>(getUser(USER2) || null);
=======
  const {
    user1S: [user1, setUser1],
    user2S: [user2, setUser2],
  } = useAuthContext();
>>>>>>> origin/TASK-02-get-matching-tracks

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

<<<<<<< HEAD
    const mToken: any = getTokenFromURL(window.location.hash);
    const u1 = getUser(USER1);
    const u2 = getUser(USER2);

    if (mToken && u1 == null) {
      setUser(mToken.access_token, USER1, setUser1);
    } else if (mToken && u2 == null) {
=======
    const mToken = getTokenFromURL(window.location.hash);

    if (mToken && user1 == null) {
      setUser(mToken.access_token, USER1, setUser1);
    } else if (mToken && user2 == null) {
>>>>>>> origin/TASK-02-get-matching-tracks
      setUser(mToken.access_token, USER2, setUser2);
    }

    window.location.hash = "";
<<<<<<< HEAD
  });

  return (
    <VStack direction="row">
      <Flex alignItems="center" justifyContent="center">
        <Heading as="h1" py="5">
          Log in to Spotify
        </Heading>
      </Flex>
=======
  }, []);

  return (
    <>
      <Heading as="h1" py="5">
        Log in to Spotify
      </Heading>
>>>>>>> origin/TASK-02-get-matching-tracks
      <Flex alignItems="center" justifyContent="center">
        <Box w="25vw" h="50vh" p="5" bg="coral">
          {user1 != null ? (
            <Profile user={user1}></Profile>
          ) : (
<<<<<<< HEAD
            <Link href={authorizationLink()} target="popup">
=======
            <Link href={authorizationLink()}>
>>>>>>> origin/TASK-02-get-matching-tracks
              <Button>Grant permissions for user 1</Button>
            </Link>
          )}
        </Box>
        <Box w="25vw" h="50vh" p="5" bg="purple">
          {user2 != null ? (
            <Profile user={user2}></Profile>
          ) : (
<<<<<<< HEAD
            <Link href={authorizationLink()} target="popup">
=======
            <Link href={authorizationLink()}>
>>>>>>> origin/TASK-02-get-matching-tracks
              <Button>Grant permissions for user 2</Button>
            </Link>
          )}
        </Box>
      </Flex>
<<<<<<< HEAD
    </VStack>
=======
      {user1 !== null && user2 !== null ? (
        <Link href="/matching_tracks">Check matching tracks</Link>
      ) : (
        <></>
      )}
    </>
>>>>>>> origin/TASK-02-get-matching-tracks
  );
};

export default AuthorizationPage;
