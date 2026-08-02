import { type User } from "./spotify";

const USER1_KEY = "USER1";
const USER2_KEY = "USER2";

const TOKEN1_KEY = "TOKEN1";
const TOKEN2_KEY = "TOKEN2";

export const saveUser = (
  key: typeof USER1_KEY | typeof USER2_KEY,
  user: User,
): void => {
  localStorage.setItem(key, JSON.stringify(user));
};

export const getStoredUser = (key: string): User | null => {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      id: String(parsed.id ?? ""),
      username: String(parsed.username ?? ""),
      photoUrl: typeof parsed.photoUrl === "string" ? parsed.photoUrl : null,
    };
  } catch {
    return null;
  }
};

export const saveToken = (
  key: typeof TOKEN1_KEY | typeof TOKEN2_KEY,
  token: string,
): void => {
  sessionStorage.setItem(key, token);
};

export const getStoredToken = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const USER_KEYS = { USER1: USER1_KEY, USER2: USER2_KEY } as const;
export const TOKEN_KEYS = { TOKEN1: TOKEN1_KEY, TOKEN2: TOKEN2_KEY } as const;
