import { auth } from "@/auth"

export const config = {
  matcher: [
    "/account/dashboard/:path*",
    "/api/users/otp",
  ],
};

export const proxy = auth;
