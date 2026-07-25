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

<<<<<<< HEAD
=======
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

>>>>>>> origin/TASK-02-get-matching-tracks
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

<<<<<<< HEAD
export const authorization = async (
  clientId: string,
  clientSecret: string,
): Promise<string> => {
  const formData = new FormData();
  formData.append("grant_type", "client_credentials");

  const authOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    method: "POST",
    body: "grant_type=client_credentials",
  };

  const res = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions,
  );
  return (await res.json()).access_token;
};

=======
>>>>>>> origin/TASK-02-get-matching-tracks
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

<<<<<<< HEAD
export const getTopTracks = async (token: string): any => {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi(
      token,
      "v1/me/top/tracks?time_range=short_term&limit=5",
      "GET",
    )
  ).items;
=======
export const getTopTracks = async (token: string): Promise<TopResponse> => {
  return (await fetchWebApi(
    token,
    "v1/me/top/tracks?time_range=long_term&limit=20",
    "GET",
  )) as TopResponse;
>>>>>>> origin/TASK-02-get-matching-tracks
};
