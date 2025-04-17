import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { protectedRoute, unprotectedRoute } from "./utils/RoutesMiddleware";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuthenticated = !!session;

  if (!isAuthenticated && protectedRoute.includes(req.nextUrl.pathname)) {
    //  startWith might be needed so just commented it out
    // req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = new URL(`/login`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && unprotectedRoute.includes(req.nextUrl.pathname)) {
    const redirectUrl = new URL(`/dashboard`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  // you guys should put route that the middleware would run on in here
  matcher: ["/login", "/register", "/dashboard/:path*"]
};
