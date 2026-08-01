import { type User } from "./spotify";

const USER1_KEY = "USER1";
const USER2_KEY = "USER2";

export const saveUser = (
  key: typeof USER1_KEY | typeof USER2_KEY,
  user: User,
): void => {
  localStorage.setItem(key, JSON.stringify(user));
};

export const getStoredUser = (key: string): User | null => {
  const raw = localStorage.getItem(key);
  return raw !== null ? (JSON.parse(raw) as User) : null;
};

export const USER_KEYS = { USER1: USER1_KEY, USER2: USER2_KEY } as const;
