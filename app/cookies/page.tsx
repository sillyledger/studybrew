import LegalLayout from "@/components/LegalLayout";

const h2 = "mt-10 text-[1.3rem] font-bold text-text-primary first:mt-0";
const p = "mt-3 text-[0.95rem] leading-[1.7] text-text-muted";
const ul = "mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-[1.7] text-text-muted";
const a = "text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="August 20, 2026">
      <p className={p}>
        This Cookie Policy explains how Study Brew uses cookies on{" "}
        <strong>app.studybrew.co</strong> and <strong>studybrew.co</strong>.
      </p>

      <h2 className={h2}>What Cookies We Use</h2>
      <p className={p}>
        We use a single essential cookie, set by our authentication
        provider (Supabase), to keep you signed in between visits. Without
        it, you'd need to log in again on every page load.
      </p>

      <h2 className={h2}>What We Don't Use</h2>
      <ul className={ul}>
        <li>No tracking or analytics cookies</li>
        <li>No advertising or third-party marketing cookies</li>
        <li>No cross-site tracking of any kind</li>
      </ul>

      <h2 className={h2}>Managing Cookies</h2>
      <p className={p}>
        Because the only cookie we use is required to keep you logged in,
        blocking it will sign you out. You can still control or clear
        cookies at any time through your browser's settings.
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>
        Questions about this policy? Email us at{" "}
        <a className={a} href="mailto:legal@onpointvc.com">legal@onpointvc.com</a>.
      </p>
    </LegalLayout>
  );
}
