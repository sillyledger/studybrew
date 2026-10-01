import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;

type TokenPayload = { email: string; exp: number };

function getSecret(): string | undefined {
  return process.env.CONFIRM_TOKEN_SECRET;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createConfirmToken(email: string): string {
  const secret = getSecret();
  if (!secret) throw new Error("CONFIRM_TOKEN_SECRET is not set");

  const payload: TokenPayload = { email, exp: Date.now() + TOKEN_TTL_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded, secret)}`;
}

export function verifyConfirmToken(token: string): {
  valid: boolean;
  email?: string;
} {
  try {
    const secret = getSecret();
    if (!secret) {
      console.error("[waitlist-token] CONFIRM_TOKEN_SECRET is not set");
      return { valid: false };
    }

    const parts = token.split(".");
    if (parts.length !== 2) {
      console.error("[waitlist-token] Malformed token");
      return { valid: false };
    }
    const [encoded, signature] = parts;

    const expected = Buffer.from(sign(encoded, secret));
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length) {
      console.error("[waitlist-token] Signature length mismatch");
      return { valid: false };
    }
    if (!timingSafeEqual(expected, actual)) {
      console.error("[waitlist-token] Invalid signature");
      return { valid: false };
    }

    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as Partial<TokenPayload>;
    if (typeof payload.email !== "string" || typeof payload.exp !== "number") {
      console.error("[waitlist-token] Invalid payload");
      return { valid: false };
    }
    if (Date.now() > payload.exp) {
      console.error("[waitlist-token] Token expired");
      return { valid: false };
    }

    return { valid: true, email: payload.email };
  } catch (err) {
    console.error("[waitlist-token] Failed to verify token", err);
    return { valid: false };
  }
}
