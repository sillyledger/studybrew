// Prices for the /pricing page. Change amounts here; the page picks the
// currency from the visitor's country (x-vercel-ip-country).
// Plus is billed once a year; `monthly` is only the "about … a month" hint.

export type CurrencyCode = "USD" | "CNY" | "TWD";

export type Pricing = {
  code: CurrencyCode;
  symbol: string;
  free: string;
  plusYearly: string;
  plusMonthly: string;
};

export const PRICING: Record<CurrencyCode, Pricing> = {
  USD: { code: "USD", symbol: "$", free: "0", plusYearly: "19", plusMonthly: "1.58" },
  CNY: { code: "CNY", symbol: "¥", free: "0", plusYearly: "98", plusMonthly: "8" },
  TWD: { code: "TWD", symbol: "NT$", free: "0", plusYearly: "449", plusMonthly: "37" },
};

/** Countries that see a local currency. Everyone else sees USD. */
const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  CN: "CNY",
  TW: "TWD",
};

export function pricingForCountry(country: string | null | undefined): Pricing {
  const code = (country && COUNTRY_CURRENCY[country.toUpperCase()]) || "USD";
  return PRICING[code];
}
