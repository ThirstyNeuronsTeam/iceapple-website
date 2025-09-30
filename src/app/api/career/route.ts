import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import clientPromise from "@/lib/mongodb";
import sgMail, { MailDataRequired } from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);


export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const name = formData.get("username")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const phone = formData.get("phone")?.toString() || "";
        const linkedIn = formData.get("linkedIn")?.toString() || "";
        const authorize = formData.get("authorize") === "true";

        const file = formData.get("resume") as File | null;
        if (!file) {
            return NextResponse.json(
                { success: false, message: "Resume file is required" },
                { status: 400 }
            );
        }

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        const resumePath = `/uploads/${fileName}`;

        const client = await clientPromise;
        const db = client.db("iceapplewebsite");
        const collection = db.collection("careers");

        const result = await collection.updateOne(
            { email },
            {
                $set: { name, email, phone, linkedIn, authorize, resumePath, updatedAt: new Date() },
                $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true }
        );

        if (!process.env.SENDGRID_TO || !process.env.SENDGRID_FROM) {
            throw new Error("Missing SENDGRID_TO or SENDGRID_FROM in environment variables");
        }

        const hrEmail: string = process.env.SENDGRID_TO;
        const domainEmail: string = process.env.SENDGRID_FROM;
        const candidateEmail: string = email;

        // Convert file buffer to base64 for SendGrid attachment
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        const base64Resume = fileBuffer.toString("base64");

        const hrMsg: MailDataRequired = {
            to: hrEmail,
            from: domainEmail,
            subject: `New Career Application from ${name}`,
            html: `
        <h2 style="color:#2C3E50;">📌 New Career Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>LinkedIn:</strong> <a href="${linkedIn}" target="_blank">${linkedIn}</a></p>
        <p><strong>Resume:</strong> <a href="${resumePath}" target="_blank">Download</a></p>
        <p><strong>Authorized to Work:</strong> ${authorize ? "✅ Yes" : "❌ No"}</p>
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

        const candidateMsg: MailDataRequired = {
            to: candidateEmail,
            from: domainEmail,
            subject: "Your Application has been Received - IceApple Careers",
            html: `
        <div style="font-family:Arial,sans-serif;color:#333;">
          <h2 style="color:#27ae60;">✅ Application Received</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thank you for applying to <strong>IceApple</strong>. Our HR team will review it shortly.</p>
          <p><strong>Summary of your details:</strong></p>
          <ul>
            <li><b>Email:</b> ${email}</li>
            <li><b>Phone:</b> ${phone}</li>
            <li><b>LinkedIn:</b> <a href="${linkedIn}" target="_blank">${linkedIn}</a></li>
          </ul>
          <p>We will get back to you if your profile matches our requirements.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>IceApple HR Team</strong></p>
          <hr/>
          <p style="font-size:12px;color:#888;">Automated confirmation email. Please do not reply.</p>
        </div>
      `,
        };

        let emailStatus = "Emails sent successfully";

        try {
            await sgMail.send(hrMsg);
            await sgMail.send(candidateMsg);
        } catch (emailErr: unknown) {
            console.error("⚠️ Email sending failed:", emailErr);
            emailStatus = "Application saved, but failed to send emails";
        }

        return NextResponse.json({ success: true, message: "Application processed", emailStatus, fileUrl: resumePath, result });
    } catch (err: unknown) {
        console.error("❌ Error handling career form:", err);
        const message = err instanceof Error ? err.message : "Unknown server error";
        return NextResponse.json({ success: false, message: "Server error", error: message }, { status: 500 });
    }
}
