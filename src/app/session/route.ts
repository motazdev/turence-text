import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession, SessionOptions } from "iron-session";
import { IUser } from "@/utils/types";
interface SessionData {
  user: IUser | null;
  isLoggedIn: boolean;
  counter: number;
}

const defaultSession: SessionData = {
  user: null,
  isLoggedIn: false,
  counter: 0,
};

const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "session_token",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
};
// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  const { user } = await request.json();
  session.isLoggedIn = true;
  session.user = user;
  session.counter = session.counter;
  await session.save();

  return Response.json(session);
}

export async function PATCH() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.counter++;
  await session.save();

  return Response.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  session.destroy();

  return Response.json(defaultSession);
}
