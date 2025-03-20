import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
const publicRoutes = [
  "/",
  "/about",
  "/sign-in", 
  "/sign-up",
  "/api/razorpay/order",
  "/api/razorpay/verify",
  "/api/razorpay/credentials",
  "/api/webhook"
];

const isPublic = createRouteMatcher(publicRoutes);

export default clerkMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: isPublic,
  // Disable development mode in production
  debug: process.env.NODE_ENV === 'development',
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
