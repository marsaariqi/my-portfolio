import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// --- Helper: Get JWT Secret ---
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing environment variable: JWT_SECRET");
  }
  return new TextEncoder().encode(secret);
};

// --- Helper: Verify Admin JWT ---
const verifyAdminJwt = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized: Missing auth token" },
      { status: 401 }
    );
  }

  try {
    await jwtVerify(token, await getJwtSecret());
    return null; // Token is valid
  } catch (e) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
};

// --- Main Middleware Function ---
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { method } = req;

  // --- Public API Routes (No auth needed) ---

  // 1. Allow login and uploadthing routes completely (for POST, OPTIONS, etc.)
  if (pathname === "/api/auth/login" || pathname === "/api/uploadthing") {
    return NextResponse.next();
  }

  // 2. Allow public POST for contact form
  if (method === "POST" && pathname === "/api/contact") {
    return NextResponse.next();
  }

  // 3. Allow public GETs for reading data (e.g., /api/projects, /api/about)
  //    BUT, block /api/contact (admin) and /api/auth/* (admin)
  if (
    method === "GET" &&
    !pathname.startsWith("/api/auth/") &&
    pathname !== "/api/contact"
  ) {
    return NextResponse.next();
  }

  // --- Protected Admin Routes (JWT required) ---
  // Any request that didn't match the public rules above will be checked for a JWT.
  // This includes:
  // - GET /api/contact (to read messages)
  // - GET /api/auth/me (to check login)
  // - POST /api/auth/logout
  // - All other POSTs, all DELETEs, PUTs, and PATCHes

  const errorResponse = await verifyAdminJwt(req);
  return errorResponse || NextResponse.next();
}

// --- Matcher ---
// Run the middleware on all API routes
export const config = {
  matcher: "/api/:path*",
};
