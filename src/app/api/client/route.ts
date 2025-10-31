import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { MailDataRequired } from "@sendgrid/mail";

interface ClientFormBody {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body: ClientFormBody = await req.json();
    const client = await clientPromise;
    const db = client.db("iceapplewebsite");
    const collection = db.collection("clients");

    // Save to DB (upsert by email)
    const result = await collection.updateOne(
      { email: body.email },
      { $set: { ...body, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );

    // -------- EMAILS --------
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_TO || !process.env.SENDGRID_FROM) {
      console.warn("⚠️ SendGrid env vars missing - skipping email notifications");
    } else {
      const { default: sgMail } = await import("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const hrEmail: string = process.env.SENDGRID_TO;
      const domainEmail: string = process.env.SENDGRID_FROM;
      const clientEmail: string = body.email;

      // Internal team email
      const teamMsg: MailDataRequired = {
        to: hrEmail,
        from: domainEmail,
        subject: `📩 New Client Inquiry from ${body.name} (${body.company || "No company"})`,
        html: `
          <div style="font-family:Arial, sans-serif; color:#333; line-height:1.6;">
            <h2 style="color:#2C3E50;">New Client Inquiry</h2>
            <p><b>Name:</b> ${body.name}</p>
            <p><b>Email:</b> ${body.email}</p>
            <p><b>Phone:</b> ${body.phone || "N/A"}</p>
            <p><b>Company:</b> ${body.company || "N/A"}</p>
            <p><b>Message:</b><br/> ${body.message || "No message provided"}</p>
            <hr/>
            <p style="font-size:12px;color:#888;">Submitted via IceApple client form.</p>
          </div>
        `,
      };

      // Confirmation email to client
      const clientMsg: MailDataRequired = {
        to: clientEmail,
        from: domainEmail,
        subject: "✅ Thank you for reaching out - IceApple",
        html: `
          <div style="font-family:Arial,sans-serif;color:#333; line-height:1.6;">
            <h2 style="color:#27ae60;">Hello ${body.name},</h2>
            <p>Thank you for contacting <strong>IceApple</strong>. Our team has received your inquiry and will respond shortly.</p>
            <p><b>Summary of your submission:</b></p>
            <ul>
              <li><b>Email:</b> ${body.email}</li>
              <li><b>Phone:</b> ${body.phone || "N/A"}</li>
              <li><b>Company:</b> ${body.company || "N/A"}</li>
            </ul>
            <p><b>Your Message:</b><br/> ${body.message || "No message provided"}</p>
            <br/>
            <p>Best Regards,</p>
            <p><b>IceApple Business Team</b></p>
            <hr/>
            <p style="font-size:12px;color:#888;">Automated confirmation. Do not reply.</p>
          </div>
        `,
      };

      try {
        await sgMail.send(teamMsg);
        await sgMail.send(clientMsg);
      } catch (emailErr: unknown) {
        console.error("⚠️ Email sending failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, result, message: "Client form processed successfully" });
  } catch (err: unknown) {
    console.error("❌ Error handling client form:", err);
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
