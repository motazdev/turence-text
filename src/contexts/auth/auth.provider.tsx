"use client";
import { IUser } from "@/utils/types";
import userService from "@/services/user";
import { setCookie } from "cookies-next";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { getCookie, removeCookie } from "../../utils/session";
import { AuthContext } from "./auth.context";

export interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: IUser;
}

const reducer = (
  state: IUser | null = null,
  action: AuthAction
): IUser | null => {
  switch (action.type) {
    case "LOGIN":
      if (!action.payload) return null;
      setCookie("token", action.payload.token, {
        maxAge: 60 * 60 * 24 * 30,
      });
      setCookie("user", JSON.stringify(action.payload), {
        maxAge: 60 * 60 * 24 * 30,
      });
      return action.payload;
    case "LOGOUT":
      removeCookie("user");
      removeCookie("token");
      return null;
    default:
      return state;
  }
};

export const AuthProvider = ({
  children,
  authState,
}: {
  children: ReactNode;
  authState: IUser | null;
}) => {
  const [user, dispatchUser] = useReducer(reducer, authState);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const tokenCookie = getCookie("token");

      if (!tokenCookie) {
        logout();
        return;
      }

      try {
        const data = await userService.getProfile();
        dispatchUser({ type: "LOGIN", payload: data.data });
        setToken(data.data.token);
      } catch (error) {
        logout();
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUser();
  }, []);

  const setUserData = (data: IUser) => {
    dispatchUser({ type: "LOGIN", payload: data });
  };

  const logout = () => {
    dispatchUser({ type: "LOGOUT" });
    removeCookie("user");
    removeCookie("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        dispatchUser,
        setUserData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
