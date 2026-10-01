import { NextResponse } from "next/server";
import { resend, WAITLIST_AUDIENCE_ID } from "@/lib/resend";
import { verifyConfirmToken } from "@/lib/waitlist-token";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectTo = (status: "success" | "invalid") =>
    NextResponse.redirect(new URL(`/waitlist/confirm?status=${status}`, url));

  const token = url.searchParams.get("token") ?? "";
  const { valid, email } = verifyConfirmToken(token);
  if (!valid || !email) return redirectTo("invalid");

  try {
    const { error } = await resend.contacts.update({
      email,
      audienceId: WAITLIST_AUDIENCE_ID,
      unsubscribed: false,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[waitlist] Failed to confirm contact", err);
    return redirectTo("invalid");
  }

  return redirectTo("success");
}
