import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Contact | Study Brew",
  description:
    "Questions, feedback, or just want to say hi — get in touch with the Study Brew team.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />

      {/* Page head */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-14 md:pt-16">
        <div className="mb-[1.1rem] font-medium text-[0.8rem] text-teal">
          Get in touch
        </div>
        <h1 className="max-w-[16ch] text-[clamp(2.2rem,4vw,3.1rem)] font-bold leading-[1.02]">
          Say hello.
        </h1>
        <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.6] text-text-muted">
          No forms, no bots — just an inbox with a real human on the other end.
        </p>
      </div>

      {/* Contact panel */}
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-14">
        <div className="relative max-w-[560px] rounded-[22px] bg-panel py-12 pl-12 pr-10 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] md:pl-[4.5rem]">
          <span className="absolute -left-px top-[3.2rem] h-8 w-2 rounded-r-[6px] bg-teal" />
          <div className="mb-2 font-medium text-[0.74rem] text-text-muted-2">
            Email
          </div>
          <a
            href="mailto:p@ryoka.xyz"
            className="break-words text-[1.35rem] font-bold text-text-primary transition-colors hover:text-teal sm:text-[1.6rem]"
          >
            p@ryoka.xyz
          </a>
          <p className="mt-4 max-w-[40ch] text-[0.9rem] leading-[1.6] text-text-muted">
            Questions, feedback, or just want to say hi — this inbox is
            read by a real person.
          </p>
        </div>
      </div>
    </main>
  );
}
