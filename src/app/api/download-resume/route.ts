import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json({ error: "File not specified" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "uploads", file);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(fileBuffer); // ✅ convert Buffer to Uint8Array

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  } catch (err) {
    console.error("❌ Error in download-resume:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
