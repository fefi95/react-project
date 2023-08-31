import { createContext, useContext } from "react";
import { type User } from "../services/spotify";

export type UserState = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>,
];

const unauthenticatedUsers = {
  user1S: [null, () => {}],
  user2S: [null, () => {}],
};

export const UsersContext: React.Context<{
  user1S: UserState;
  user2S: UserState;
}> = createContext(unauthenticatedUsers);

export const useAuthContext = () => useContext(UsersContext);
