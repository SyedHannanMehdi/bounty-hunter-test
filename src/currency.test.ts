import { formatCurrency, parseCurrency } from "./currency";

// ---------------------------------------------------------------------------
// formatCurrency
// ---------------------------------------------------------------------------
describe("formatCurrency", () => {
  // ── existing behaviour ────────────────────────────────────────────────────
  it("formats a basic positive integer with $ symbol", () => {
    expect(formatCurrency(50)).toBe("$50.00");
  });

  it("formats a positive float with $ symbol", () => {
    expect(formatCurrency(9.99)).toBe("$9.99");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("accepts a custom currency symbol", () => {
    expect(formatCurrency(9.99, "€")).toBe("€9.99");
    expect(formatCurrency(9.99, "£")).toBe("£9.99");
  });

  // ── bug fixes ─────────────────────────────────────────────────────────────
  it("always shows 2 decimal places for whole numbers (bug #2)", () => {
    expect(formatCurrency(100)).toBe("$100.00");
    expect(formatCurrency(1)).toBe("$1.00");
    expect(formatCurrency(1000)).toBe("$1000.00");
  });

  it("handles negative numbers correctly (bug #1)", () => {
    expect(formatCurrency(-50)).toBe("$-50.00");
    expect(formatCurrency(-0.99)).toBe("$-0.99");
    expect(formatCurrency(-1234.56)).toBe("$-1234.56");
  });

  it("handles negative numbers with custom symbol", () => {
    expect(formatCurrency(-99.99, "€")).toBe("€-99.99");
  });
});

// ---------------------------------------------------------------------------
// parseCurrency
// ---------------------------------------------------------------------------
describe("parseCurrency", () => {
  // ── existing behaviour ────────────────────────────────────────────────────
  it("parses a simple $ string", () => {
    expect(parseCurrency("$50.00")).toBe(50);
  });

  it("parses a $ string with comma thousands separator", () => {
    expect(parseCurrency("$1,234.56")).toBe(1234.56);
  });

  // ── bug fixes ─────────────────────────────────────────────────────────────
  it("parses a € string with comma thousands separator (bug #3)", () => {
    expect(parseCurrency("€1,234.56")).toBe(1234.56);
  });

  it("parses a £ string", () => {
    expect(parseCurrency("£99.99")).toBe(99.99);
  });

  it("parses a € string without thousands separator", () => {
    expect(parseCurrency("€50.00")).toBe(50);
  });

  it("parses a £ string with comma thousands separator", () => {
    expect(parseCurrency("£1,000.00")).toBe(1000);
  });
});
