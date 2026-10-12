// Single place for business details, calculator assumptions and subsidy values.
export const SITE = {
  WHATSAPP_NUMBER: "918610744855", // digits only, with country code
  PHONE_DISPLAY: "+91 86107 44855",
  PHONE_TEL: "+918610744855",
  EMAIL: "info.axsunrenewtech@gmail.com",
  ADDRESS: "17, Pannadi Thurai Street, B.P. Agraharam, Erode – 638005",
  INSTAGRAM_URL: "INSTAGRAM_URL",
  MAP_EMBED:
    "https://www.google.com/maps?q=B.P.+Agraharam,+Erode,+Tamil+Nadu+638005&output=embed",
  DEFAULT_WA_MESSAGE: "Hi Axsun, I'm interested in rooftop solar for my home.",
};

export const CALC = {
  tariffPerUnit: 7, // ₹ per unit, used to convert bill -> units
  unitsPerKwPerMonth: 120,
  costPerKw: 65000, // rough installed cost ₹/kW before subsidy
  sizes: [2, 3, 5, 7.5, 10],
};

// Subsidy in ₹ by system size. Amounts follow prevailing scheme rules and may change.
export const SUBSIDY = [
  { label: "1 kW", kw: 1, central: 30000, state: 0 },
  { label: "2 kW", kw: 2, central: 60000, state: 0 },
  { label: "3 kW", kw: 3, central: 78000, state: 0 },
  { label: "> 3 kW", kw: 99, central: 78000, state: 0 },
];

export function subsidyFor(kw: number) {
  const row = kw <= 1 ? SUBSIDY[0] : kw <= 2 ? SUBSIDY[1] : kw <= 3 ? SUBSIDY[2] : SUBSIDY[3];
  return row.central + row.state;
}

export const waLink = (text: string) =>
  `https://wa.me/${SITE.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
