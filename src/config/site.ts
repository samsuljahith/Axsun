// Single place for business details, calculator assumptions and subsidy values.
export const SITE = {
  // Public site URL, no trailing slash. Set this once the domain is live (used for og:image / canonical).
  SITE_URL: "",
  WHATSAPP_NUMBER: "918610744855", // digits only, with country code
  PHONE_DISPLAY: "+91 86107 44855",
  PHONE_TEL: "+918610744855",
  EMAIL: "info.axsunrenewtech@gmail.com",
  ADDRESS: "17, Pannadi Thurai Street, B.P. Agraharam, Erode – 638005",
  // e.g. "https://instagram.com/axsunrenewtech". Leave empty to hide the Instagram icon.
  INSTAGRAM_URL: "",
  MAP_EMBED: "https://www.google.com/maps?q=B.P.+Agraharam,+Erode,+Tamil+Nadu+638005&output=embed",
  DEFAULT_WA_MESSAGE: "Hi Axsun, I'm interested in rooftop solar for my home.",
  LOGO: "/brand/axsun-logo.webp",
  MARK: "/brand/axsun-mark.webp",
  OG_IMAGE: "/og-image.jpg",
};

export const CALC = {
  // TN domestic EB bills are issued every 2 months. The calculator asks for the bill/units
  // as printed on the bill and divides by this to get a monthly figure.
  billingMonths: 2,
  // TODO(Akmal): confirm. Flat average ₹/unit used to convert a bill amount into units.
  tariffPerUnit: 7,
  unitsPerKwPerMonth: 120,
  // TODO(Akmal): confirm. Rough installed cost ₹/kW before subsidy.
  costPerKw: 65000,
  sizes: [2, 3, 4, 5, 7.5, 10],
};

// Subsidy in ₹ by system size. Amounts follow prevailing scheme rules and may change.
// TODO(Akmal): confirm Tamil Nadu state amounts. While every `state` is 0 the Tamil Nadu
// column and timeline step are hidden on the site.
export const SUBSIDY = [
  { label: "1 kW", kw: 1, central: 30000, state: 0 },
  { label: "2 kW", kw: 2, central: 60000, state: 0 },
  { label: "3 kW", kw: 3, central: 78000, state: 0 },
  { label: "> 3 kW", kw: 99, central: 78000, state: 0 },
];

export const HAS_STATE_SUBSIDY = SUBSIDY.some((r) => r.state > 0);

export function subsidyFor(kw: number) {
  const row = kw <= 1 ? SUBSIDY[0] : kw <= 2 ? SUBSIDY[1] : kw <= 3 ? SUBSIDY[2] : SUBSIDY[3];
  return row!.central + row!.state;
}

/** Monthly units -> suggested size and rough economics. `payback` is null when there is nothing to save. */
export function calcResult(monthlyUnits: number) {
  const units = Number.isFinite(monthlyUnits) && monthlyUnits > 0 ? monthlyUnits : 0;
  const needKw = units / CALC.unitsPerKwPerMonth;
  const max = CALC.sizes[CALC.sizes.length - 1]!;
  const kw = CALC.sizes.find((s) => s >= needKw) ?? max;
  const gen = kw * CALC.unitsPerKwPerMonth;
  const subsidy = subsidyFor(kw);
  const net = Math.max(0, kw * CALC.costPerKw - subsidy);
  const monthlySave = Math.min(gen, units) * CALC.tariffPerUnit;
  const payback = monthlySave > 0 ? net / (monthlySave * 12) : null;
  return { kw, plus: needKw > max, gen, subsidy, monthlySave, payback };
}

/** Value as printed on the TN bill (covers `billingMonths`) -> monthly units. */
export function monthlyUnitsFrom(mode: "bill" | "units", value: number) {
  const perMonth = (Number.isFinite(value) ? Math.max(0, value) : 0) / CALC.billingMonths;
  return mode === "bill" ? perMonth / CALC.tariffPerUnit : perMonth;
}

export const waLink = (text: string) =>
  `https://wa.me/${SITE.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

/** Indian mobile number: optional +91/0 prefix, then 10 digits starting 6–9. */
export const isIndianMobile = (s: string) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(s.replace(/[\s-]/g, ""));
