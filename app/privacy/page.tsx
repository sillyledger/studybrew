import LegalLayout from "@/components/LegalLayout";

const h2 = "mt-10 text-[1.3rem] font-bold text-text-primary first:mt-0";
const p = "mt-3 text-[0.95rem] leading-[1.7] text-text-muted";
const ul = "mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-[1.7] text-text-muted";
const a = "text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 20, 2026">
      <p className={p}>
        Study Brew ("we", "us", or "our") operates the language-learning
        application available at <strong>app.studybrew.co</strong> and the
        marketing website at <strong>studybrew.co</strong>. This Privacy
        Policy explains how we collect, use, and protect your information.
      </p>

      <h2 className={h2}>Information We Collect</h2>
      <p className={p}>
        We collect information you provide directly, including your email
        address and password when you create an account. We also collect
        the content you create within the app — notebooks, docs, and saved
        words — in order to provide the service.
      </p>

      <h2 className={h2}>How We Use Your Information</h2>
      <ul className={ul}>
        <li>To provide, maintain, and improve the Study Brew service</li>
        <li>To authenticate your account and keep it secure</li>
        <li>To send you essential service communications (e.g. password resets)</li>
        <li>To process payments via our payment provider, Paddle</li>
      </ul>

      <h2 className={h2}>Data Storage</h2>
      <p className={p}>
        Your data is stored securely in a hosted database (Supabase). We do
        not sell your personal data or share it with third parties for
        marketing purposes.
      </p>

      <h2 className={h2}>Payments</h2>
      <p className={p}>
        Payment processing is handled by Paddle. We do not store your
        credit card information. Please refer to{" "}
        <a className={a} href="https://www.paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer">
          Paddle's Privacy Policy
        </a>{" "}
        for how payment data is handled.
      </p>

      <h2 className={h2}>Cookies</h2>
      <p className={p}>
        We use cookies solely for authentication purposes, to keep you
        logged in. See our{" "}
        <a className={a} href="/cookies">Cookie Policy</a> for details.
      </p>

      <h2 className={h2}>Your Rights</h2>
      <p className={p}>
        You may request deletion of your account and associated data at any
        time by contacting us at{" "}
        <a className={a} href="mailto:legal@onpointvc.com">legal@onpointvc.com</a>.
        We will process your request within 30 days.
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>
        Questions about this policy? Email us at{" "}
        <a className={a} href="mailto:legal@onpointvc.com">legal@onpointvc.com</a>.
      </p>
    </LegalLayout>
  );
}
