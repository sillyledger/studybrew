import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

const h2 = "mt-10 text-[1.3rem] font-bold text-text-primary first:mt-0";
const p = "mt-3 text-[0.95rem] leading-[1.7] text-text-muted";
const ul = "mt-3 list-disc space-y-2 pl-5 text-[0.95rem] leading-[1.7] text-text-muted";
const a = "text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary";
const b = "font-semibold text-text-primary";

const EMAIL = "p@ryoka.xyz";

function Email() {
  return (
    <a className={a} href={`mailto:${EMAIL}`}>
      {EMAIL}
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy policy" lastUpdated="14 November 2026">
      <p className={p}>
        Study Brew is an app for learning English. This page tells you what we
        keep about you, why, and how to delete it. Questions? Email <Email />.
      </p>

      <h2 className={h2}>What we keep</h2>
      <ul className={ul}>
        <li>
          <strong className={b}>Your account:</strong> your email address and
          your password. We never see your password; it is stored in a safe,
          scrambled form.
        </li>
        <li>
          <strong className={b}>Your name:</strong> only if you add one in
          Settings.
        </li>
        <li>
          <strong className={b}>What you make in the app:</strong> saved words,
          meanings, notes, notebooks, decks, review history, reading progress
          and your settings.
        </li>
        <li>
          <strong className={b}>What you import:</strong> text you paste, files
          you upload, and links you import. When you import a link, our server
          opens that page once to copy its text.
        </li>
        <li>
          <strong className={b}>Guest accounts:</strong> you can start without
          an email. We still keep your words and progress, linked to your
          browser. If you add an email later, everything stays with your
          account.
        </li>
        <li>
          <strong className={b}>Waitlist:</strong> if you join the waitlist, we
          keep only your email address. It is stored in Resend, not in our
          database. We send you one email to confirm. The link stops working
          after 48 hours.
        </li>
        <li>
          <strong className={b}>Technical data:</strong> your IP address and
          browser details, for a short time, to keep the app safe and stop
          abuse.
        </li>
      </ul>

      <h2 className={h2}>What we don&apos;t do</h2>
      <ul className={ul}>
        <li>We don&apos;t sell your data.</li>
        <li>We don&apos;t show ads.</li>
        <li>We don&apos;t use your data to train AI.</li>
        <li>
          The app (app.studybrew.co) has no tracking or analytics. It only uses
          the cookies you need to stay signed in. Our website (studybrew.co)
          uses Google Analytics to count visits. See our{" "}
          <Link className={a} href="/cookies">
            Cookie Policy
          </Link>
          .
        </li>
      </ul>

      <h2 className={h2}>Who helps us run Study Brew</h2>
      <p className={p}>
        These services store or process your data for us, and only for that:
      </p>
      <ul className={ul}>
        <li>
          <strong className={b}>Supabase:</strong> our database and sign-in.
        </li>
        <li>
          <strong className={b}>Vercel:</strong> hosts the app and website.
        </li>
        <li>
          <strong className={b}>Resend:</strong> sends our emails (for example,
          confirm your email or reset your password).
        </li>
        <li>
          <strong className={b}>Google Analytics:</strong> counts visits to our
          website (not the app).
        </li>
        <li>
          <strong className={b}>Paddle:</strong> will handle payments when paid
          plans start. We will never see or store your card details.
        </li>
      </ul>
      <p className={p}>Their servers may be in another country than yours.</p>
      <p className={p}>
        Some stories have a Spotify or Apple Podcasts player. If you press
        play, Spotify or Apple may set their own cookies. Their own privacy
        policies apply.
      </p>

      <h2 className={h2}>How long we keep it</h2>
      <p className={p}>
        We keep your data while you have an account. Notes in Trash are deleted
        after 30 days. Guest accounts that are not used for a long time may be
        deleted.
      </p>

      <h2 className={h2}>Your choices</h2>
      <ul className={ul}>
        <li>
          <strong className={b}>Delete your account:</strong> Settings →
          Account → Delete my account. This deletes your account and everything
          in it, forever.
        </li>
        <li>
          <strong className={b}>Download your words:</strong> Words → Export
          (CSV or Excel).
        </li>
        <li>
          <strong className={b}>Anything else:</strong> email <Email /> and we
          will help you see, fix or delete your data.
        </li>
      </ul>

      <h2 className={h2}>Children</h2>
      <p className={p}>
        Study Brew is for adults and teenagers aged 13 and older.
      </p>

      <h2 className={h2}>Changes</h2>
      <p className={p}>
        If we change this policy, we update the date at the top. If the change
        is big, we tell you in the app or by email.
      </p>
    </LegalLayout>
  );
}
