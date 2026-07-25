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
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  ListItem,
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

  const showUnorderedList = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ulRef?.current) {
        ulRef.current.hidden = false;
        e.target.hidden = true;
      }
    },
    [],
  );

  return (
    <>
      <Heading as="h1">
        Compatibility between {user1?.username} and {user2?.username}
      </Heading>
      <CircularProgress
        p="5"
        isIndeterminate={Number.isNaN(stats)}
        value={stats}
        size="120px"
        thickness="15px"
      >
        <CircularProgressLabel>
          {Number.isNaN(stats) ? "" : `${stats}%`}
        </CircularProgressLabel>
      </CircularProgress>

      <Button onClick={showUnorderedList}>See the top matching tacks!</Button>
      <UnorderedList styleType="none" m="0" spacing="4" ref={ulRef} hidden>
        {matchingTracks.slice(0, 5).map((t, index) => (
          <ListItem key={index} width="xl">
            <Track track={t}></Track>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default MatchingTracks;
