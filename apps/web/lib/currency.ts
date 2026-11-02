/**
 * Shared currency helpers used by the Contact and Project Intake forms so the
 * USD/INR toggle and budget formatting stay consistent across the site.
 */

export type CurrencyCode = "USD" | "INR";

export const CURRENCY_OPTIONS = [
  { code: "USD" as const, symbol: "$", label: "USD", name: "US Dollar" },
  { code: "INR" as const, symbol: "₹", label: "INR", name: "Indian Rupee" },
] as const;

// Approximate conversion rate used to convert the typed amount when the user
// toggles between currencies. Not a live FX feed.
const USD_TO_INR = 83;

/** Convert a numeric amount between currencies using the fixed rate above. */
export function convertAmount(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  if (from === to || !amount) return amount;
  // Normalise to USD first, then convert to the target currency.
  const usd = from === "INR" ? amount / USD_TO_INR : amount;
  return to === "INR" ? usd * USD_TO_INR : usd;
}

/** Format a numeric budget string (e.g. "5000") as a localized currency string. */
export function formatCurrency(amount: string, currency: CurrencyCode): string {
  const value = Number(amount);
  if (!amount || Number.isNaN(value)) return "Not specified";
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
