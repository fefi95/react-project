import { describe, it, expect, beforeEach } from "vitest";
import { saveUser, getStoredUser, saveToken, getStoredToken, USER_KEYS, TOKEN_KEYS } from "./storage";
import { type User } from "./spotify";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  const user: User = {
    id: "user-123",
    username: "testuser",
    photoUrl: "https://example.com/photo.jpg",
  };

  describe("saveUser / getStoredUser round-trip", () => {
    it("stores and retrieves a user", () => {
      saveUser(USER_KEYS.USER1, user);
      const result = getStoredUser(USER_KEYS.USER1);
      expect(result).toEqual(user);
    });

    it("stores users independently under different keys", () => {
      const user2: User = {
        id: "user-456",
        username: "otheruser",
        photoUrl: null,
      };
      saveUser(USER_KEYS.USER1, user);
      saveUser(USER_KEYS.USER2, user2);

      expect(getStoredUser(USER_KEYS.USER1)).toEqual(user);
      expect(getStoredUser(USER_KEYS.USER2)).toEqual(user2);
    });
  });

  describe("getStoredUser", () => {
    it("returns null when key does not exist", () => {
      expect(getStoredUser("NONEXISTENT")).toBeNull();
    });

    it("returns null for invalid JSON", () => {
      localStorage.setItem(USER_KEYS.USER1, "not-json{{{");
      expect(getStoredUser(USER_KEYS.USER1)).toBeNull();
    });

    it("strips legacy token field from stored data", () => {
      const legacy = {
        id: "u1",
        username: "name",
        photoUrl: "",
        token: "secret-token",
      };
      localStorage.setItem(USER_KEYS.USER1, JSON.stringify(legacy));

      const result = getStoredUser(USER_KEYS.USER1);
      expect(result).toEqual({ id: "u1", username: "name", photoUrl: "" });
      expect(result).not.toHaveProperty("token");
    });

    it("handles null photoUrl", () => {
      const data = { id: "u1", username: "name", photoUrl: null };
      localStorage.setItem(USER_KEYS.USER1, JSON.stringify(data));

      const result = getStoredUser(USER_KEYS.USER1);
      expect(result?.photoUrl).toBeNull();
    });
  });

  describe("saveToken / getStoredToken", () => {
    it("stores and retrieves a token from sessionStorage", () => {
      saveToken(TOKEN_KEYS.TOKEN1, "abc123");
      expect(getStoredToken(TOKEN_KEYS.TOKEN1)).toBe("abc123");
    });

    it("returns null when no token is stored", () => {
      expect(getStoredToken(TOKEN_KEYS.TOKEN1)).toBeNull();
    });

    it("stores tokens independently under different keys", () => {
      saveToken(TOKEN_KEYS.TOKEN1, "token-a");
      saveToken(TOKEN_KEYS.TOKEN2, "token-b");
      expect(getStoredToken(TOKEN_KEYS.TOKEN1)).toBe("token-a");
      expect(getStoredToken(TOKEN_KEYS.TOKEN2)).toBe("token-b");
    });
  });
});
