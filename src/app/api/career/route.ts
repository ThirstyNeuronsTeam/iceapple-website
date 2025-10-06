import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import clientPromise from "@/lib/mongodb";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

// Setup SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("❌ Missing SENDGRID_API_KEY in environment variables");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract form fields
    const name = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const linkedIn = formData.get("linkedIn")?.toString() || "";
    const authorize = formData.get("authorize") === "true";

    // Extract file
    const file = formData.get("resume") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, message: "Resume file is required" }, { status: 400 });
    }

    // ✅ Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        message: "Invalid file type. Only PDF, DOC, DOCX are allowed.",
      }, { status: 400 });
    }

    // ✅ Validate file size (max 5 MB)
    const buffer = Buffer.from(await file.arrayBuffer());
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (buffer.length > maxSize) {
      return NextResponse.json({
        success: false,
        message: "File too large. Maximum size is 5 MB.",
      }, { status: 400 });
    }

    // 📂 Save file in private "uploads" folder (outside public)
    const uploadDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Only store the file name in DB
    const resumeFile = fileName;

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("iceapplewebsite");
    const collection = db.collection("careers");

    const result = await collection.updateOne(
      { email },
      {
        $set: {
          name,
          email,
          phone,
          linkedIn,
          authorize,
          resumeFile,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    // Check SendGrid env
    if (!process.env.SENDGRID_TO || !process.env.SENDGRID_FROM) {
      throw new Error("Missing SENDGRID_TO or SENDGRID_FROM in .env");
    }

    const hrEmail = process.env.SENDGRID_TO;
    const domainEmail = process.env.SENDGRID_FROM;

    // Convert resume to Base64 for attachment
    const base64Resume = buffer.toString("base64");

    // Secure download link
    const downloadUrl = `${process.env.DOMAIN}/api/download-resume?file=${encodeURIComponent(fileName)}`;

    // HR email
    const hrMsg: MailDataRequired = {
      to: hrEmail,
      from: domainEmail,
      subject: `📌 New Career Application from ${name}`,
      html: `
        <h2 style="color:#2C3E50;">New Career Application Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>LinkedIn:</b> <a href="${linkedIn}" target="_blank">${linkedIn}</a></p>
        <p><b>Resume:</b> <a href="${downloadUrl}" target="_blank">Download Securely</a></p>
        <p><b>Authorized to Work:</b> ${authorize ? "✅ Yes" : "❌ No"}</p>
        <hr />
        <p style="font-size:12px;color:#888;">Automated email from IceApple Careers portal.</p>
      `,
      attachments: [
        {
          content: base64Resume,
          filename: file.name,
          type: file.type || "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    // Candidate email
    const candidateMsg: MailDataRequired = {
      to: email,
      from: domainEmail,
      subject: "✅ Your Application has been Received - IceApple Careers",
      html: `
        <div style="font-family:Arial,sans-serif;color:#333;">
          <h2 style="color:#27ae60;">Application Received</h2>
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for applying to <b>IceApple</b>. Our HR team will review your application shortly.</p>
          <p><b>Summary:</b></p>
          <ul>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>LinkedIn: <a href="${linkedIn}" target="_blank">${linkedIn}</a></li>
          </ul>
          <p>We will get back to you if your profile matches our requirements.</p>
          <br/>
          <p>Best Regards,</p>
          <p><b>IceApple HR Team</b></p>
          <hr/>
          <p style="font-size:12px;color:#888;">Automated confirmation email. Please do not reply.</p>
        </div>
      `,
    };

    let emailStatus = "Emails sent successfully";
    try {
      await sgMail.send(hrMsg);
      await sgMail.send(candidateMsg);
    } catch (emailErr) {
      console.error("⚠️ Email sending failed:", emailErr);
      emailStatus = "Application saved, but failed to send emails";
    }

    return NextResponse.json({
      success: true,
      message: "Application processed",
      emailStatus,
      fileName,
      result,
    });
  } catch (err) {
    console.error("❌ Error handling career form:", err);
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ success: false, message: "Server error", error: message }, { status: 500 });
  }
}
