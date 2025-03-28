import { NextRequest, NextResponse } from "next/server";
import routesConstants from "./constants/routes.constants";
import conceAi from "./lib/conce-ai";
import { setCookie } from "cookies-next/client";
import { Session } from "next-auth";
import { EmailVerificationStep } from "./types/auth.enum";
export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();
  let session: Session | null = null;

  try {
    session = await conceAi.getSession(request);
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error(`Error getting session: ${error}`, err);
  }

  if (session && session.user) {
    if (
      session.user.emailVerified === null &&
      nextUrl.pathname !== routesConstants.allRoutes.auth.authVerifyEmail
    ) {
      nextUrl.pathname = routesConstants.allRoutes.auth.authVerifyEmail;
      const encryptedData = await conceAi.crypto.encryptData({
        step: EmailVerificationStep.start,
        userId: session.user.id,
      });
      nextUrl.search = `?state=${encryptedData}`;
      return NextResponse.redirect(nextUrl);
    }
  }

  if (Object.values(routesConstants.noAuth).includes(nextUrl.pathname)) {
    if (session) {
      nextUrl.pathname = routesConstants.allRoutes.app;
      return NextResponse.redirect(nextUrl);
    }
  }

  if (
    Object.values(routesConstants.protectedPaths).includes(nextUrl.pathname)
  ) {
    if (!session) {
      nextUrl.pathname = routesConstants.allRoutes.auth.authSignIn;
      const response = NextResponse.redirect(nextUrl);
      setCookie("redirectTo", request.nextUrl.pathname, {
        maxAge: 60 * 60,
      });
      return response;
    }
  }

  if (
    Object.values(routesConstants.adminPaths.admin).includes(nextUrl.pathname)
  ) {
    if (session && session.user.Role?.name !== "ADMIN") {
      nextUrl.pathname = "/404";
      return NextResponse.redirect(nextUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
