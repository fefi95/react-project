import { Text } from "@chakra-ui/react";
import { type Track as TrackType } from "../services/spotify";

interface TrackProps {
  track: TrackType;
}

const Track = ({ track }: TrackProps): JSX.Element => {
  return (
    <>
      <Text>
        {track.name} -&nbsp;
        {track.artists.map((ar) => ar.name).join(". ")}
      </Text>
    </>
  );
};

export default Track;
