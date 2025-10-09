import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import clientPromise from "@/lib/mongodb";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

// Setup SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY in environment variables");
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract fields
    const name = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const linkedIn = formData.get("linkedIn")?.toString() || "";
    const authorize = formData.get("authorize") === "true";

    // Extract file
    const file = formData.get("resume") as Blob | null;
    if (!file) {
      return NextResponse.json({ success: false, message: "Resume required" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const fileType = file.type || "application/pdf";
    if (!allowedTypes.includes(fileType)) {
      return NextResponse.json({ success: false, message: "Invalid file type" }, { status: 400 });
    }

    // Validate size
    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: "File too large (max 5MB)" }, { status: 400 });
    }

    // Save to private folder
    const uploadDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadDir, { recursive: true });
    const originalName =  "resume.pdf";
    const extension = originalName.split(".").pop() || "pdf";
    const fileName = `${Date.now()}-resume.${extension}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db("iceapplewebsite");
    await db.collection("careers").updateOne(
      { email },
      {
        $set: { name, email, phone, linkedIn, authorize, resumeFile: fileName, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    // SendGrid emails
    const hrEmail = process.env.SENDGRID_TO!;
    const domainEmail = process.env.SENDGRID_FROM!;
    const base64Resume = buffer.toString("base64");
    const downloadUrl = `${process.env.DOMAIN}/api/download-resume?file=${encodeURIComponent(fileName)}`;

    // HR Email
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
        <hr/>
        <p style="font-size:12px;color:#888;">Automated email from IceApple Careers portal.</p>
      `,
      attachments: [
        {
          content: base64Resume,
          filename: fileName,
          type: fileType,
          disposition: "attachment",
        },
      ],
    };

    // Candidate Email
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

    // Send emails safely
    let emailStatus = "Emails sent successfully";
    try {
      await sgMail.send(hrMsg);
      await sgMail.send(candidateMsg);
    } catch (err) {
      console.error("Email sending failed:", err);
      emailStatus = "Application saved, but failed to send emails";
    }

    return NextResponse.json({
      success: true,
      message: "Application processed successfully",
      emailStatus,
      fileName,
    });
  } catch (err: unknown) {
    console.error("Error handling career form:", err);
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ success: false, message: "Server error", error: message }, { status: 500 });
  }
}
