import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/profile")) {
    const authCookie = request.cookies.get("access_token");
    if (!authCookie)
      return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/login")) {
    const authCookie = request.cookies.get("access_token");
    if (authCookie) return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/register")) {
    const authCookie = request.cookies.get("access_token");
    if (authCookie) return NextResponse.redirect(new URL("/", request.url));
  }
};
