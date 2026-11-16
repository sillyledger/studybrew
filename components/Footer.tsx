import Link from "next/link";

const PRODUCT_LINKS = [
  { href: "/flashcards", label: "Flashcards" },
  { href: "/stories", label: "Stories" },
  { href: "/practice", label: "Practice" },
  { href: "/pricing", label: "Pricing" },
  { href: "/app", label: "App" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

function FooterColumn({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-[1.1rem] font-medium text-[0.76rem] text-text-muted-2">
        {heading}
      </div>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full max-w-[1120px] border-t border-line-soft px-6 pt-[3.2rem] md:px-14">
        <div className="grid grid-cols-2 gap-[2.5rem] pb-[2.8rem] md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col gap-[0.9rem] sm:col-span-1">
            <div className="flex items-center gap-[0.6rem]">
              <img src="/studybrew-logo.svg" alt="Study Brew logo" width={26} height={26} />
              <span className="text-xl font-bold">Study Brew</span>
            </div>
            <p className="max-w-[26ch] text-[0.86rem] leading-[1.6] text-text-muted">
              Made by a learner, for learners. Free vocabulary, stories, and
              practice for English learners.
            </p>
          </div>

          <FooterColumn heading="Product">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.88rem] text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn heading="Company">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.88rem] text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn heading="Legal">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.88rem] text-text-muted transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-soft py-[1.6rem]">
          <span className="font-medium text-[0.72rem] text-text-muted-2">
            © 2026 Study Brew. All rights reserved.
          </span>
          <span className="font-medium text-[0.72rem] text-text-muted-2">
            Made by a learner, for learners.
          </span>
          <div className="flex gap-[0.9rem]">
            <a
              href="https://www.pinterest.com/studybrewstories/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="text-text-muted-2 transition-colors hover:text-teal"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345l-.333 1.36c-.053.226-.174.271-.402.165-1.495-.699-2.436-2.887-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.003 2.35-1.494 3.146 1.124.347 2.317.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
