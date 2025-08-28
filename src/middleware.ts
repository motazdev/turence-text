import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import cartService from "./services/cart";

export default async function middleware(req: NextRequest) {
  const lang = (await cookies()).get("lang")?.value;
  const token = (await cookies()).get("token")?.value;
  const cartId = req.cookies.get("cartid")?.value;

  const response = NextResponse.next();
  response.headers.set("x-lang", lang || "en");
  if (token) {
    response.headers.set("Authorization", `Bearer ${token}`);
  }
  const authPages = ["/login", "/register"];
  const protectedPages = ["/notifications", "profile", "/favorites"];

  if (token && authPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && protectedPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!cartId) {
    const data = await cartService.generateCartId();
    if (data && data.data?.cart_id) {
      response.cookies.set({
        name: "cartid",
        value: data.data.cart_id,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 60 * 60,
      });
    }
  }
  if (cartId) {
    response.headers.set("x-cartid", cartId);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
