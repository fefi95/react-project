import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getTokenFromURL,
  authorizationLink,
  getProfile,
  getTopTracks,
  type AuthenticationToken,
} from "./spotify";

describe("getTokenFromURL", () => {
  describe("when the url is empty", () => {
    it("returns null", () => {
      expect(getTokenFromURL("")).toBe(null);
    });
  });

  describe("when the url is not empty", () => {
    it("returns a token", () => {
      const expectedToken: AuthenticationToken = {
        access_token: "fake_token",
        token_type: "Bearer",
        expires_in: "3600",
      };
      expect(
        getTokenFromURL(
          "#access_token=fake_token&token_type=Bearer&expires_in=3600",
        ),
      ).toEqual(expectedToken);
    });
  });
});

describe("authorizationLink", () => {
  it("returns a URL pointing to the Spotify authorization endpoint", () => {
    const link = authorizationLink();
    expect(link).toContain("https://accounts.spotify.com/authorize");
  });

  it("includes the response_type=token parameter", () => {
    expect(authorizationLink()).toContain("response_type=token");
  });

  it("includes the required scopes", () => {
    const link = authorizationLink();
    expect(link).toContain("user-top-read");
    expect(link).toContain("user-read-private");
    expect(link).toContain("user-read-email");
  });

  it("includes the redirect URI", () => {
    expect(authorizationLink()).toContain("redirect_uri=");
  });

  it("includes the client id", () => {
    expect(authorizationLink()).toContain("client_id=");
  });
});

describe("getProfile", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("returns a User mapped from the Spotify API response", async () => {
    const mockApiResponse = {
      id: "spotify_user_id",
      display_name: "Test User",
    };
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve(mockApiResponse),
    } as Response);

    const result = await getProfile("my_token");

    expect(result).toEqual({
      id: "spotify_user_id",
      token: "my_token",
      username: "Test User",
      photoUrl: "",
    });
  });

  it("calls the Spotify /v1/me/ endpoint with the provided token", async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve({ id: "id", display_name: "name" }),
    } as Response);

    await getProfile("bearer_token_123");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("v1/me/"),
      expect.objectContaining({
        headers: { Authorization: "Bearer bearer_token_123" },
      }),
    );
  });
});

describe("getTopTracks", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("calls the Spotify top tracks endpoint", async () => {
    const mockResponse = { items: [], next: null, previous: null };
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    } as Response);

    await getTopTracks("my_token");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("v1/me/top/tracks"),
      expect.objectContaining({
        headers: { Authorization: "Bearer my_token" },
      }),
    );
  });

  it("returns the top tracks response", async () => {
    const mockResponse = {
      items: [
        {
          id: "track1",
          name: "Song",
          artists: [{ id: "a1", name: "Artist" }],
          preview_url: null,
          href: "https://api.spotify.com/v1/tracks/track1",
        },
      ],
      next: null,
      previous: null,
    };
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const result = await getTopTracks("my_token");

    expect(result).toEqual(mockResponse);
  });
});
