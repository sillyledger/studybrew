import LegalLayout from "@/components/LegalLayout";

const h2 = "mt-10 text-[1.3rem] font-bold text-text-primary first:mt-0";
const p = "mt-3 text-[0.95rem] leading-[1.7] text-text-muted";
const a = "text-teal underline decoration-teal-dim underline-offset-2 hover:text-text-primary";

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="August 20, 2026">
      <p className={p}>
        These Terms of Service govern your use of Study Brew, the
        language-learning application available at{" "}
        <strong>app.studybrew.co</strong>. By creating an account, you
        agree to these terms.
      </p>

      <h2 className={h2}>Use of the Service</h2>
      <p className={p}>
        You may use Study Brew for personal and educational
        language-learning purposes. You agree not to use the service to
        store or distribute unlawful content, attempt to reverse-engineer
        the application, or interfere with its operation.
      </p>

      <h2 className={h2}>Your Content</h2>
      <p className={p}>
        You retain full ownership of all notebooks, docs, and words you
        create in Study Brew. We do not claim any rights to your content.
        You are responsible for the content you store in the service.
      </p>

      <h2 className={h2}>Account Termination</h2>
      <p className={p}>
        You may delete your account at any time. We reserve the right to
        suspend or terminate accounts that violate these terms.
      </p>

      <h2 className={h2}>Availability</h2>
      <p className={p}>
        We aim to provide a reliable service but do not guarantee
        uninterrupted availability. We are not liable for any loss of data
        or interruption of service.
      </p>

      <h2 className={h2}>Changes to These Terms</h2>
      <p className={p}>
        We may update these terms from time to time. Continued use of
        Study Brew after changes are posted constitutes acceptance of the
        updated terms.
      </p>

      <h2 id="refunds" className={h2}>Refund Policy</h2>
      <p className={p}>
        Once paid plans are live, payments will be processed by Paddle. If
        you're charged and have a valid reason to request a refund —
        for example, a billing error or a service issue — contact us at{" "}
        <a className={a} href="mailto:legal@onpointvc.com">legal@onpointvc.com</a>{" "}
        within 14 days of the charge, and we'll review your request.
      </p>
      <p className={p}>
        Refund requests made after this window, or without a valid reason,
        will be considered on a case-by-case basis.
      </p>

      <h2 className={h2}>Contact</h2>
      <p className={p}>
        Questions? Email us at{" "}
        <a className={a} href="mailto:legal@onpointvc.com">legal@onpointvc.com</a>.
      </p>
    </LegalLayout>
  );
}
