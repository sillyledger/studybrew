// The Study Brew cup: a coffee cup that fills with teal from the bottom.
// Used by the roadmap (road to beta) and the home page (daily review).

// Cup geometry (SVG user units).
const CUP_TOP = 66;
const CUP_BOTTOM = 232;
const CUP_BODY = `M44 ${CUP_TOP} H214 V174 Q214 ${CUP_BOTTOM} 156 ${CUP_BOTTOM} H102 Q44 ${CUP_BOTTOM} 44 174 Z`;

export default function Cup({
  fraction,
  id,
  ariaLabel,
  value,
  label,
  className = "w-full",
}: {
  /** How full the cup is, 0 to 1. */
  fraction: number;
  /** Unique prefix for the SVG clip paths, so two cups can share a page. */
  id: string;
  ariaLabel: string;
  /** Optional big number drawn on the cup, e.g. "6/8". */
  value?: string;
  /** Optional small label under the number. */
  label?: string;
  className?: string;
}) {
  const liquidTop = CUP_BOTTOM - fraction * (CUP_BOTTOM - CUP_TOP);
  // Keep the number inside the liquid when there's room, otherwise sit it
  // near the bottom of the cup. The part outside the liquid is drawn light,
  // the part inside dark, so it reads at any fill level.
  const numberY = Math.min((liquidTop + CUP_BOTTOM) / 2 + 4, CUP_BOTTOM - 30);
  const labelY = numberY + 17;

  const text = (fill: string) => (
    <g fill={fill} textAnchor="middle" fontFamily="var(--font-sans), system-ui, sans-serif">
      {value && (
        <text x="129" y={numberY} fontSize="46" fontWeight="700" letterSpacing="-0.03em">
          {value}
        </text>
      )}
      {label && (
        <text x="129" y={labelY} fontSize="12.5" fontWeight="500">
          {label}
        </text>
      )}
    </g>
  );

  return (
    <svg viewBox="0 0 290 260" role="img" aria-label={ariaLabel} className={className}>
      <defs>
        <clipPath id={`${id}-body`}>
          <path d={CUP_BODY} />
        </clipPath>
        <clipPath id={`${id}-liquid`}>
          <rect x="0" y={liquidTop} width="290" height={260 - liquidTop} />
        </clipPath>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fd6b2" />
          <stop offset="1" stopColor="#4fb892" />
        </linearGradient>
      </defs>

      {/* Steam */}
      <g fill="none" stroke="var(--color-text-muted-2)" strokeWidth="3" strokeLinecap="round">
        <path className="roadmap-steam" d="M99 52 c-9 -9 9 -15 0 -24 c-9 -9 9 -14 0 -22" />
        <path
          className="roadmap-steam [animation-delay:0.6s]"
          d="M129 48 c-9 -9 9 -15 0 -24 c-9 -9 9 -14 0 -22"
        />
        <path
          className="roadmap-steam [animation-delay:1.2s]"
          d="M159 52 c-9 -9 9 -15 0 -24 c-9 -9 9 -14 0 -22"
        />
      </g>

      {/* Saucer */}
      <path
        d="M24 246 H250"
        stroke="var(--color-border-strong)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Handle */}
      <path
        d="M214 100 C 262 100, 262 170, 214 170"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Cup body, liquid and label */}
      <path d={CUP_BODY} fill="var(--color-panel-2)" />
      <g clipPath={`url(#${id}-body)`}>
        <rect
          x="0"
          y={liquidTop}
          width="290"
          height={260 - liquidTop}
          fill={`url(#${id}-fill)`}
        />
        {fraction > 0 && fraction < 1 && (
          <rect x="0" y={liquidTop} width="290" height="3" fill="#8ee3c4" opacity="0.7" />
        )}
        {text("var(--color-text-primary)")}
        <g clipPath={`url(#${id}-liquid)`}>{text("#06291d")}</g>
      </g>
      <path
        d={CUP_BODY}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
