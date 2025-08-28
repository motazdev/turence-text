import { deleteCookie } from "cookies-next";
import cookie from "js-cookie";
export const setCookie = (name: string, value: string) => {
  cookie.set(name, value);
};

export const getCookie = (cookieName: string) => {
  return cookie.get(cookieName);
};

export const removeCookie = (cookieName: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(cookieName);
  } else {
    deleteCookie(cookieName);
  }
};
