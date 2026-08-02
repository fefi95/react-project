export interface User {
  id: string;
  photoUrl: string | null;
  username: string;
}

export interface AuthenticationToken {
  access_token: string;
  expires_in: string;
  token_type: string;
}

export interface Artists {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
  images: string[];
}

export interface Track {
  id: string;
  name: string;
  artists: Artists[];
  preview_url: string;
  href: string;
}

export interface TopResponse {
  items: Track[];
  next: string;
  previous: string;
}

export const authorizationLink = (): string => {
  const endpoint = "https://accounts.spotify.com/authorize";
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  if (typeof clientId !== "string" || clientId.length === 0) {
    throw new Error(
      "Missing VITE_SPOTIFY_CLIENT_ID environment variable. Set it in your .env file.",
    );
  }
  const redirectUri = "http://localhost:5173/";
  const scopes = ["user-top-read", "user-read-private", "user-read-email"];

  return `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20",
  )}&response_type=token&show_dialog=true`;
};

export const getTokenFromURL = (query: string): AuthenticationToken | null => {
  if (!query) {
    return null;
  }

  const params = new URLSearchParams(query.substring(1));
  const accessToken = params.get("access_token");
  const tokenType = params.get("token_type");
  const expiresIn = params.get("expires_in");

  if (accessToken == null || tokenType == null || expiresIn == null) {
    return null;
  }

  return {
    access_token: accessToken,
    token_type: tokenType,
    expires_in: expiresIn,
  };
};

const fetchWebApi = async <T = unknown>(
  token: string,
  endpoint: string,
  method: string,
  body: string | null = null,
): Promise<T> => {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    ...(body && { body: JSON.stringify(body) }),
  });
  return (await res.json()) as T;
};

export const getProfile = async (token: string): Promise<User> => {
  const profile = await fetchWebApi<{ id: string; display_name: string }>(
    token,
    "v1/me/",
    "GET",
  );

  return {
    id: profile.id,
    username: profile.display_name,
    photoUrl: "",
  };
};

export const getTopTracks = async (token: string): Promise<TopResponse> => {
  return (await fetchWebApi(
    token,
    "v1/me/top/tracks?time_range=long_term&limit=20",
    "GET",
  )) as TopResponse;
};
