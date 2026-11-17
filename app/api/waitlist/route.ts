import { NextResponse } from "next/server";
import { resend, audienceFor, type WaitlistList } from "@/lib/resend";
import { createConfirmToken } from "@/lib/waitlist-token";
import { confirmEmailHtml } from "@/lib/waitlist-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: string;
  let list: WaitlistList;
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
    list = body?.list === "tutor" ? "tutor" : "waitlist";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    const { error } = await resend.contacts.create({
      email,
      audienceId: audienceFor(list),
      unsubscribed: true,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[waitlist] Failed to create contact", err);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }

  try {
    const token = createConfirmToken(email, list === "tutor" ? "tutor" : undefined);
    const confirmUrl = `https://www.studybrew.co/api/waitlist/confirm?token=${encodeURIComponent(token)}`;
    const { error } = await resend.emails.send({
      from: "Study Brew <hello@studybrew.co>",
      to: email,
      subject:
        list === "tutor"
          ? "Confirm your spot on the Study Brew tutor waitlist"
          : "Confirm your spot on the Study Brew waitlist",
      html: confirmEmailHtml(confirmUrl),
    });
    if (error) throw error;
  } catch (err) {
    console.error("[waitlist] Failed to send confirm email", err);
  }

  return NextResponse.json({ success: true });
}
