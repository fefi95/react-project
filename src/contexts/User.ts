import { createContext } from "react";
import { User } from "../services/spotify";

type UserState = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>,
];

export const User1Context: React.Context<UserState> = createContext(null);

export const User2Context: React.Context<UserState> = createContext(null);
