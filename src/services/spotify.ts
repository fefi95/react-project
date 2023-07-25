export interface User {
  id: string;
  token: string;
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
export interface Track {
  id: string;
  name: string;
  artists: Artists[];
}

export interface TopResponse {
  items: Track[];
  next: string;
  previous: string;
}

export const authorizationLink = (): string => {
  const endpoint = "https://accounts.spotify.com/authorize";
  const clientId = "c885059149324ef1b5d431e6e84c5500";
  const redirectUri = "http://localhost:5173/";
  const scopes = ["user-top-read", "user-read-private", "user-read-email"];

  return `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20",
  )}&response_type=token&show_dialog=true`;
};

export const getTokenFromURL = (query: string): AuthenticationToken | null => {
  return query
    ? (query
        .substring(1)
        .split("&")
        .reduce(function (initial, item) {
          if (item) {
            const parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
          }
          return initial;
        }, {}) as AuthenticationToken)
    : null;
};

const fetchWebApi = async (
  token: string,
  endpoint: string,
  method: string,
  body: string | null = null,
): Promise<any> => {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    ...(body && { body: JSON.stringify(body) }),
  });
  return await res.json();
};

export const getProfile = async (token: string): Promise<User> => {
  const profile = await fetchWebApi(token, "v1/me/", "GET");

  return {
    id: profile.id,
    token,
    username: profile.display_name,
    photoUrl: "",
  };
};

export const getTopTracks = async (token: string): Promise<TopResponse> => {
  return (await fetchWebApi(
    token,
    "v1/me/top/tracks?time_range=short_term&limit=10",
    "GET",
  )) as TopResponse;
};
