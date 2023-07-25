import {
  getTopTracks,
  type Track as TrackType,
  type User,
} from "../services/spotify";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { User1Context, User2Context } from "../contexts/User";
import Track from "../components/Track";

const MatchingTracks = (): JSX.Element => {
  const [user1, setUser1] = useContext(User1Context);
  const [user2, setUser2] = useContext(User2Context);

  const [user1TopTracks, setUser1TopTracks] = useState<TrackType[]>([]);
  const [user2TopTracks, setUser2TopTracks] = useState<TrackType[]>([]);

  const fetchTopTracks = async (
    user: User,
    setTopTrack: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    const topTracks = await getTopTracks(user.token);
    setTopTrack(topTracks.items);
  };

  useEffect(() => {
    if (user1 !== null) {
      fetchTopTracks(user1, setUser1TopTracks);
    }
    if (user2 !== null) {
      fetchTopTracks(user2, setUser2TopTracks);
    }
  }, [user1, user2]);

  const matchingTracks = (
    user1Tracks: TrackType[],
    user2Tracks: TrackType[],
  ): TrackType[] => {
    return user1Tracks.filter((e) => {
      return user2Tracks.some((t) => t.id === e.id);
    });
  };

  return (
    <ul>
      {matchingTracks(user1TopTracks, user2TopTracks).map((t, index) => (
        <li key={index}>
          <Track track={t}></Track>
        </li>
      ))}
    </ul>
  );
};

export default MatchingTracks;
