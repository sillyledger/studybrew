import Nav from "@/components/Nav";

export default function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <Nav />
      <div className="mx-auto w-full max-w-[760px] px-6 pb-20 pt-10 md:px-14 md:pt-16">
        <h1 className="text-[clamp(2rem,3.4vw,2.6rem)] font-bold leading-[1.05]">
          {title}
        </h1>
        <p className="mt-3 font-medium text-[0.8rem] text-text-muted-2">
          Last updated: {lastUpdated}
        </p>
        <div className="mt-10">{children}</div>
      </div>
    </main>
  );
}
