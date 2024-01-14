import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/auth/login");
    const isRegisterPage = pathname.startsWith("/auth/register");
    const isVerificationPage = pathname.startsWith(
      "/profile/email-verification"
    );
    const sensitiveRoutes = ["/profile"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }
    if (isRegisterPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }
    // if (isVerificationPage && isAuth) {
    //   return NextResponse.redirect(new URL("/profile", req.url));
    // }
    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/auth/login ", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matchter: ["/", "/auth/login", "/auth/register", "/profile/:path*"],
};
