import { createContext, useContext } from "react";
import { type User } from "../services/spotify";

export type UserState = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>,
];

export type TokenState = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
];

const unauthenticatedUsers: {
  user1S: UserState;
  user2S: UserState;
  token1S: TokenState;
  token2S: TokenState;
} = {
  user1S: [null, () => {}],
  user2S: [null, () => {}],
  token1S: [null, () => {}],
  token2S: [null, () => {}],
};

export const UsersContext = createContext(unauthenticatedUsers);

export const useAuthContext = () => useContext(UsersContext);
