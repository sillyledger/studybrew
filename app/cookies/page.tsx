import LegalLayout from "@/components/LegalLayout";

const h2 = "mt-10 text-[1.3rem] font-bold text-text-primary first:mt-0";
const p = "mt-3 text-[0.95rem] leading-[1.7] text-text-muted";
const ul = "mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-[1.7] text-text-muted";
const a = "text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="October 6, 2026">
      <p className={p}>
        This Cookie Policy explains how Study Brew uses cookies on{" "}
        <strong>app.studybrew.co</strong> and <strong>studybrew.co</strong>.
      </p>

      <h2 className={h2}>Essential cookie</h2>
      <p className={p}>
        When you sign in, our authentication provider (Supabase) sets one
        essential cookie to keep you signed in between visits. Without it,
        you would need to log in again on every page load.
      </p>

      <h2 className={h2}>Analytics cookies</h2>
      <p className={p}>
        On studybrew.co, we use Google Analytics 4 to see which pages people
        visit and how they find us. It sets cookies named _ga and _ga_
        followed by an ID, and sends usage data to Google, such as pages
        viewed, device type and approximate location. We turn off Google's
        advertising features, including Google signals and ad
        personalization.
      </p>

      <h2 className={h2}>Pages without analytics</h2>
      <p className={p}>
        The Story Valley page (studybrew.co/stories/story-valley) loads no
        analytics and sets no cookies.
      </p>

      <h2 className={h2}>What We Don't Use</h2>
      <ul className={ul}>
        <li>No advertising or marketing cookies</li>
        <li>No ad personalization or retargeting</li>
        <li>We do not sell your data</li>
      </ul>

      <h2 className={h2}>Managing Cookies</h2>
      <p className={p}>
        You can block or clear cookies at any time in your browser settings.
        Blocking the essential cookie signs you out. Blocking the analytics
        cookies does not change how Study Brew works. To opt out of Google
        Analytics on all websites, you can install the{" "}
        <a className={a} href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics opt-out add-on
        </a>
        .
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>
        Questions about this policy? Email us at{" "}
        <a className={a} href="mailto:legal@onpointvc.com">legal@onpointvc.com</a>.
      </p>
    </LegalLayout>
  );
}
