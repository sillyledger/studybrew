const VARIANT = {
  tip: { border: "border-l-teal", label: "text-teal", text: "Tip:" },
  note: { border: "border-l-yellow", label: "text-yellow", text: "Note:" },
} as const;

export default function HelpTip({
  variant = "tip",
  children,
}: {
  variant?: keyof typeof VARIANT;
  children: React.ReactNode;
}) {
  const v = VARIANT[variant];
  return (
    <div
      className={`my-6 rounded-[10px] border border-l-[3px] border-line bg-panel-2 px-4 py-3.5 text-[0.88rem] leading-[1.65] text-white/80 ${v.border}`}
    >
      <b className={`font-bold ${v.label}`}>{v.text}</b> {children}
    </div>
  );
}
