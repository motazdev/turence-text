import { ApiErrorResponse } from "@/utils/types";
import { removeCookie } from "@/utils/session";
import { getServerCookie } from "@/utils/ssr";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const ssrToken = await getServerCookie("token");
    const ssrLang = await getServerCookie("NEXT_LOCALE");
    const cartId = await getServerCookie("cartid");
    const token = getCookie("token");
    const lang = ssrLang || getCookie("NEXT_LOCALE") || "en";
    config.headers.Authorization = `Bearer ${token ?? ssrToken}`;
    config.headers["x-lang"] = `${lang}`;
    config.headers["x-cartid"] = `${cartId}`;
    return config;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    return errorHandler(error);
  }
);

async function errorHandler(error: AxiosError<ApiErrorResponse>) {
  if (error.status === 401) {
    // userActionOutsideOfComponent({ user: null });
    removeCookie("user");
    removeCookie("token");
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      const searchParams = currentUrl.search
        ? `&${currentUrl.searchParams.toString()}`
        : "";
      window.location.replace(
        `/login?redirect=${currentUrl.pathname}${searchParams}`
      );
    } else {
      return redirect("/login");
    }
  }
  if (error.response?.data) {
    error.message = error.response.data.message || error.message;
  }
  return Promise.reject(error);
}

request.interceptors.response.use(
  (config) => config.data,
  async (error: AxiosError<ApiErrorResponse>) => {
    return errorHandler(error);
  }
);

export default request;
