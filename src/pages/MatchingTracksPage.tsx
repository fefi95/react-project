import {
  getTopTracks,
  type Track as TrackType,
  type User,
} from "../services/spotify";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuthContext } from "../contexts/User";
import Track from "../components/Track";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const getMatchingTracks = (
  user1Tracks: TrackType[],
  user2Tracks: TrackType[],
): TrackType[] => {
  return user1Tracks.filter((e) => {
    return user2Tracks.some((t) => t.id === e.id);
  });
};

const fetchTopTracks = async (
  user: User,
  setTopTrack: React.Dispatch<React.SetStateAction<any[]>>,
): Promise<void> => {
  const topTracks = await getTopTracks(user.token);
  setTopTrack(topTracks.items);
};

const MatchingTracks = (): JSX.Element => {
  const {
    user1S: [user1],
    user2S: [user2],
  } = useAuthContext();

  const navigate = useNavigate();

  const [user1TopTracks, setUser1TopTracks] = useState<TrackType[]>([]);
  const [user2TopTracks, setUser2TopTracks] = useState<TrackType[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (user1 == null || user2 == null) {
      navigate("/");
      return;
    }

    fetchTopTracks(user1, setUser1TopTracks);
    fetchTopTracks(user2, setUser2TopTracks);
  }, []);

  const [matchingTracks, stats] = useMemo(() => {
    const mt = getMatchingTracks(user1TopTracks, user2TopTracks);
    return [mt, (mt.length / user1TopTracks.length) * 100];
  }, [user1TopTracks, user2TopTracks]);

  const safeStats = Number.isNaN(stats) ? 0 : Math.round(stats);

  const showUnorderedList = useCallback(
    () => {
      setShowMatches(true);
      if (ulRef?.current) {
        ulRef.current.hidden = false;
      }
    },
    [],
  );

  return (
    <Stack spacing="6">
      <Heading as="h1" size={{ base: "lg", md: "xl" }}>
        Compatibility between {user1?.username} and {user2?.username}
      </Heading>

      <Box
        p={{ base: 5, md: 6 }}
        borderRadius="xl"
        bg="whiteAlpha.850"
        border="2px solid"
        borderColor="brand.200"
        boxShadow="card"
      >
        <HStack spacing="5" align="center" flexWrap="wrap">
          <CircularProgress
            p="2"
            isIndeterminate={Number.isNaN(stats)}
            value={safeStats}
            size="132px"
            thickness="14px"
            color="accent.500"
            trackColor="brand.100"
          >
            <CircularProgressLabel fontWeight="700">
              {Number.isNaN(stats) ? "" : `${safeStats}%`}
            </CircularProgressLabel>
          </CircularProgress>
          <Box>
            <Heading as="h2" size="md">
              Match score
            </Heading>
            <Text mt="2" color="ink.700" maxW="md">
              Based on each listener&apos;s top Spotify tracks.
            </Text>
          </Box>
        </HStack>
      </Box>

      <Box
        p={{ base: 5, md: 6 }}
        borderRadius="xl"
        bg="whiteAlpha.850"
        border="2px solid"
        borderColor="accent.200"
        boxShadow="card"
      >
        <Heading as="h2" size="md" mb="4">
          Top matching tracks
        </Heading>
        <Text color="ink.700" mb="5">
          Reveal the best overlaps between both listening profiles.
        </Text>

        <Button onClick={showUnorderedList} hidden={showMatches}>
          See the top matching tacks!
        </Button>
        <UnorderedList
          styleType="none"
          m="0"
          spacing="4"
          ref={ulRef}
          hidden={!showMatches}
        >
        {matchingTracks.slice(0, 5).map((t, index) => (
          <ListItem key={index} width="xl">
            <Track track={t}></Track>
          </ListItem>
        ))}
        </UnorderedList>
      </Box>
    </Stack>
  );
};

export default MatchingTracks;
