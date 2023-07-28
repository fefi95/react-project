import {
  getTopTracks,
  type Track as TrackType,
  type User,
} from "../services/spotify";
import { useEffect, useState, useContext } from "react";
import { User1Context, User2Context } from "../contexts/User";
import Track from "../components/Track";
import { useNavigate } from "react-router-dom";
import {
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
  const [user1] = useContext(User1Context);
  const [user2] = useContext(User2Context);

  const navigate = useNavigate();

  const [user1TopTracks, setUser1TopTracks] = useState<TrackType[]>([]);
  const [user2TopTracks, setUser2TopTracks] = useState<TrackType[]>([]);

  const [matchingTracks, setMatchingTracks] = useState<[TrackType[], number]>([
    [],
    0,
  ]);

  useEffect(() => {
    if (user1 == null || user2 == null) {
      navigate("/");
      return;
    }

    fetchTopTracks(user1, setUser1TopTracks);
    fetchTopTracks(user2, setUser2TopTracks);
  }, [user1, user2]);

  useEffect(() => {
    const mt = getMatchingTracks(user1TopTracks, user2TopTracks);
    setMatchingTracks([mt, (mt.length / user1TopTracks.length) * 100]);
  }, [user1TopTracks, user2TopTracks]);

  return (
    <>
      <Heading as="h1">
        Compatibility between {user1?.username} and {user2?.username}
      </Heading>
      <CircularProgress
        p="5"
        value={matchingTracks[1]}
        size="120px"
        thickness="15px"
      >
        <CircularProgressLabel>{matchingTracks[1]}%</CircularProgressLabel>
      </CircularProgress>
      <Heading as="h2">Your top songs!</Heading>
      <UnorderedList styleType="none" m="0" spacing="4">
        {matchingTracks[0].slice(0, 5).map((t, index) => (
          <ListItem key={index} width="xl">
            <Track track={t}></Track>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default MatchingTracks;
