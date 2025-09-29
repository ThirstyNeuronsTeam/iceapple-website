// /app/api/check-email/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ exists: false, error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("iceapple");
    const collection = db.collection("careers");

    // Check if email exists without fetching all documents
    const existing = await collection.findOne({ email: email });

    return NextResponse.json({ exists: !!existing });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json({ exists: false, error: "Server error" }, { status: 500 });
  }
}
