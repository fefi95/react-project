import { type User } from "../src/services/spotify";

export const mockUser1Token = "mock_token_1";
export const mockUser2Token = "mock_token_2";

export const mockUser1: User = {
  id: "user1_id",
  username: "Alice",
  photoUrl: null,
};

export const mockUser2: User = {
  id: "user2_id",
  username: "Bob",
  photoUrl: null,
};

export const mockTracks = [
  {
    id: "track1",
    name: "Song One",
    artists: [{ id: "a1", name: "Artist One" }],
    preview_url: null,
    href: "https://api.spotify.com/v1/tracks/track1",
  },
  {
    id: "track2",
    name: "Song Two",
    artists: [{ id: "a2", name: "Artist Two" }],
    preview_url: null,
    href: "https://api.spotify.com/v1/tracks/track2",
  },
  {
    id: "track3",
    name: "Song Three",
    artists: [{ id: "a3", name: "Artist Three" }],
    preview_url: null,
    href: "https://api.spotify.com/v1/tracks/track3",
  },
];

export const mockUser1Tracks = [
  ...mockTracks,
  {
    id: "track4",
    name: "Song Four",
    artists: [{ id: "a4", name: "Artist Four" }],
    preview_url: null,
    href: "https://api.spotify.com/v1/tracks/track4",
  },
];

export const mockUser2Tracks = [
  ...mockTracks,
  {
    id: "track5",
    name: "Song Five",
    artists: [{ id: "a5", name: "Artist Five" }],
    preview_url: null,
    href: "https://api.spotify.com/v1/tracks/track5",
  },
];
