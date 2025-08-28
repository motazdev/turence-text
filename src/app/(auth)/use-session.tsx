import { IUser } from "@/utils/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionOptions } from "iron-session";
interface SessionData {
  isLoggedIn: boolean;
  counter: number;
  user: IUser | null;
}

const defaultSession: SessionData = {
  isLoggedIn: false,
  counter: 0,
  user: null,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "session_token",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
};
const sessionApiRoute = "/session";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  });

  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
}

function loginRequest(user: IUser) {
  return fetchJson<SessionData>(sessionApiRoute, {
    method: "POST",
    body: JSON.stringify({ user }),
  });
}

function logoutRequest() {
  return fetchJson<SessionData>(sessionApiRoute, {
    method: "DELETE",
  });
}

function incrementRequest() {
  return fetchJson<SessionData>(sessionApiRoute, {
    method: "PATCH",
  });
}

export default function useSession() {
  const queryClient = useQueryClient();

  const { data: session = defaultSession, isLoading } = useQuery<SessionData>({
    queryKey: ["session"],
    queryFn: () => fetchJson<SessionData>(sessionApiRoute),
    staleTime: 0,
  });

  const login = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data);
    },
  });

  const logout = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const increment = useMutation({
    mutationFn: incrementRequest,
    onSuccess: (data) => {
      queryClient.setQueryData(["session"], data);
    },
  });

  return {
    session,
    isLoading,
    login: login.mutateAsync,
    logout: logout.mutateAsync,
    increment: increment.mutateAsync,
  };
}
