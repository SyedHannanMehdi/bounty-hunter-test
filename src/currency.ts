/**
 * Formats a numeric value as a currency string.
 *
 * - Always shows exactly 2 decimal places.
 * - Handles negative numbers correctly (e.g. -50 → "$-50.00").
 * - Defaults to the USD "$" symbol; pass a custom symbol as the second argument.
 *
 * @param amount  The numeric amount to format.
 * @param symbol  The currency symbol to prepend (default: "$").
 * @returns       A formatted currency string.
 */
export function formatCurrency(amount: number, symbol: string = "$"): string {
  const isNegative = amount < 0;
  const absFormatted = Math.abs(amount).toFixed(2);
  return isNegative ? `${symbol}-${absFormatted}` : `${symbol}${absFormatted}`;
}

/**
 * Parses a currency string into a plain number.
 *
 * Strips leading currency symbols ($, €, £) and removes thousands-separator
 * commas before converting the remaining string to a float.
 *
 * @param value  A currency string such as "$1,234.56", "€1,234.56", or "£99.99".
 * @returns      The parsed numeric value.
 */
export function parseCurrency(value: string): number {
  // Remove any leading currency symbol ($, €, £) and strip commas
  const cleaned = value.replace(/^[$€£]/, "").replace(/,/g, "");
  return parseFloat(cleaned);
}
