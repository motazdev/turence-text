"use client";
import { createContext, useContext } from "react";
import { AuthAction } from "./auth.provider";
import { IUser } from "@/utils/types";
interface AuthContextType {
  user: IUser | null;
  token: string | null;
  dispatchUser: React.Dispatch<AuthAction>;
  setUserData: (data: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuth = () => useContext(AuthContext);
