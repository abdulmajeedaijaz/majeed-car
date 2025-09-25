import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection("users").findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Strip sensitive info
    const { _id, password: _, ...safeUser } = user;

    return NextResponse.json({
      user: { ...safeUser, id: _id.toString() },
    });
  } catch (err) {
    console.error("Login API Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}