import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json({ error: "File not specified" }, { status: 400 });
    }

    // Remove null bytes to prevent null byte injection attacks
    const fileWithoutNullBytes = file.replace(/\0/g, '');

    // Sanitize filename - extract only the basename to prevent path traversal
    const sanitizedFile = path.basename(fileWithoutNullBytes);

    // Validate filename format (timestamp-resume.ext) to ensure it matches expected pattern
    if (!/^\d+-resume\.(pdf|doc|docx)$/i.test(sanitizedFile)) {
      return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, sanitizedFile);

    // Additional security check: ensure resolved path stays within uploads directory
    const normalizedPath = path.normalize(filePath);
    const normalizedUploadsDir = path.normalize(uploadsDir);

    if (!normalizedPath.startsWith(normalizedUploadsDir + path.sep)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Look up original filename from MongoDB
    let originalFileName = sanitizedFile; // fallback to sanitized file if not found in DB
    try {
      const client = await clientPromise;
      const db = client.db("iceapplewebsite");
      const career = await db.collection("careers").findOne({ resumeFile: sanitizedFile });
      if (career && career.originalFileName) {
        originalFileName = career.originalFileName;
      }
    } catch (dbErr) {
      console.warn("⚠️ Could not fetch original filename from DB:", dbErr);
      // Continue with sanitizedFile as filename
    }

    // Determine MIME type based on file extension instead of forcing PDF
    const ext = path.extname(sanitizedFile).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    const contentType = mimeTypes[ext] || "application/octet-stream";

    const fileBuffer = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(fileBuffer); // ✅ convert Buffer to Uint8Array

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${originalFileName}"`,
      },
    });
  } catch (err) {
    console.error("❌ Error in download-resume:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
