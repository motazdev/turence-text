"use server";
import { cookies } from "next/headers";

export const getServerCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  return token;
};

export const setServerCookie = async (cookieName: string, value: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.set(cookieName, value);
  return token;
};

export const deleteServerCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.delete(cookieName);
  return token;
};
