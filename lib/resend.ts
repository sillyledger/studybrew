import { Resend } from "resend";

// The Resend constructor throws without a key, which breaks `next build`
// wherever RESEND_API_KEY isn't set. Fall back to a placeholder so the build
// succeeds; API calls will fail at runtime and are handled by the routes.
export const resend = new Resend(process.env.RESEND_API_KEY || "re_missing_key");
export const WAITLIST_AUDIENCE_ID = process.env.RESEND_WAITLIST_AUDIENCE_ID!;
