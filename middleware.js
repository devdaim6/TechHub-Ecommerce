import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const adminRoutes = ["/admin"];
    const sensitiveRoutes = ["/profile", "/orders", "/addresses"];

    /* The line `const isAuth = await getToken({ req });` is calling the `getToken` function from the
 `next-auth/jwt` module and passing the `req` object as an argument. */
    const isAuth = await getToken({ req });

    /* These lines of code are checking if the current `pathname` starts with "/login" or
   "/auth/register". */
    const isLoginPage = pathname.startsWith("/login");
    const isRegisterPage = pathname.startsWith("/register");
    const isCheckoutPage = pathname.startsWith("/checkout");
    const isVerificationPage = [
      "/profile/email-verification",
      "/api/email-verification",
    ];

    /* These lines of code are checking if the current `pathname` starts with any of the routes defined
   in the `sensitiveRoutes` and `adminRoutes` arrays. */
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const verifiedUserAccessingVerificationPage = isVerificationPage.some(
      (route) => pathname.startsWith(route)
    );
    const isAccessingAdminRoutes = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    /* This code block is handling the logic for the verification page. */

    if (verifiedUserAccessingVerificationPage) {
      if (isAuth?.isVerified) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
      return NextResponse.next();
    }

    /* This code block is handling the logic for the login page. */
    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    /* The code block `if (isCheckoutPage) { ... }` is checking if the current `pathname` matches the
  "/checkout" route. If it does, it further checks if the user is not authenticated (`!isAuth`). */
    if (isCheckoutPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    }

    /* The code block `if (isAuth) { ... }` is checking if the user is authenticated. If the user is
    authenticated, it then checks if they are accessing any of the admin routes
    (`isAccessingAdminRoutes`). If they are accessing an admin route, it further checks if the
    user's role (`req.nextauth.token?.role`) is "customer". */
    if (isAuth) {
      if (isAccessingAdminRoutes) {
        if (req.nextauth.token?.role == "customer")
          return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    /* The code block `if (isRegisterPage) { ... }` is handling the logic for the register page. */
    if (isRegisterPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      return NextResponse.next();
    }

    /* The code block `if (!isAuth && isAccessingSensitiveRoute)` is checking if the user is not
   authenticated (`!isAuth`) and is trying to access a sensitive route
   (`isAccessingSensitiveRoute`). */
    if (!isAuth) {
      if (isAccessingSensitiveRoute) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }
    
  },
  {
    /* The `callbacks` object is a property of the `withAuth` middleware function. It allows you to
   define callback functions that will be executed during the authentication process. In this case,
   the `authorized` callback function is defined. */
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

/* The `export const config` block is defining the configuration options for the middleware. In this
case, it is specifying the routes that should be matched by the middleware. */
export const config = {
  matchter: [
    "/",
    "/orders",
    "/wislist",
    "/addresses",
    "/checkout",
    "/register",
    "/login",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
