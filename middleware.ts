import { NextResponse, type NextRequest } from "next/server";

// Lightweight cookie presence check. Real verification happens in server components
// and server actions via getSession()/requireAdmin().
const SESSION_COOKIE = "au_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
