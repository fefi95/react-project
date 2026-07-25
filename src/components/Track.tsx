import { type Track as TrackType } from "../services/spotify";

interface TrackProps {
  track: TrackType;
}

const Track = ({ track }: TrackProps): JSX.Element => {
  return (
    <iframe
      style={{ borderRadius: "15px" }}
      src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
      width="100%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export default Track;
