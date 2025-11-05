// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectMongoDB from "@/libs/mongodb";
import Awbibib from "@/models/AwbibibModel";
import { compare } from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { username, password } = await req.json();

    // 1. Find the user
    const checkAwbibib = await Awbibib.findOne({ username });

    if (!checkAwbibib) {
      return NextResponse.json(
        {
          success: false,
          message: `${username ? username : "User"} is not here:)`,
        },
        { status: 401 }
      );
    }

    // 2. Correctly compare the password
    // (This is the fix from before)
    const checkPassword = await compare(password, checkAwbibib.password);

    if (!checkPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "wrong password:)",
        },
        { status: 401 }
      );
    }

    // 3. --- Create JWT ---
    // Login is successful, create the token
    const token = jwt.sign(
      { username: checkAwbibib.username, role: "admin" }, // Payload
      process.env.JWT_SECRET, // No '!' needed in JS
      { expiresIn: "1h" } // Expires in 1 hour
    );

    // 4. --- Set the httpOnly cookie ---
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    // 5. Send success response
    return NextResponse.json({
      success: true,
      message: "hi! awbibib",
    });
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
