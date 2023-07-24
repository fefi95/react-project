import { getTopTracks, type User } from "../services/spotify";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { User1Context, User2Context } from "../contexts/User";

const MatchingTracks = (): JSX.Element => {
  const [user1, setUser1] = useContext(User1Context);
  const [user2, setUser2] = useContext(User2Context);

  const [user1TopTracks, setUser1TopTracks] = useState<any[]>([]);
  const [user2TopTracks, setUser2TopTracks] = useState<any[]>([]);

  const fetchTopTracks = async (
    user: User,
    setTopTrack: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    const topTracks = await getTopTracks(user.token);
    setTopTrack(topTracks);
  };

  useEffect(() => {
    if (user1) {
      fetchTopTracks(user1, setUser1TopTracks);
    }
    if (user2) {
      fetchTopTracks(user2, setUser2TopTracks);
    }
  }, []);

  return (
    <>
      <h2>{user1TopTracks}</h2>
      <h2>{user2TopTracks}</h2>
    </>
  );
};

export default MatchingTracks;
