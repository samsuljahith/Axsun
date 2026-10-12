import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ta";

const en = {
  nav: {
    calc: "Calculator",
    subsidy: "Subsidy",
    process: "Process",
    faq: "FAQ",
    contact: "Contact",
  },
  cta: "Get FREE Solar Assessment on WhatsApp",
  ctaShort: "WhatsApp Us",
  call: "Call",
  hero: {
    title: "Powering Smarter Homes for a Brighter Tomorrow.",
    sub: "Residential Solar EPC Solutions in Erode & Tamil Nadu",
    calc: "Calculate My Savings",
    chips: [
      "Lower Bills",
      "Energy Independence",
      "Cleaner Environment",
      "Long-Term Value",
      "Reliable EPC",
    ],
  },
  problem: {
    title: "Your electricity expense keeps growing",
    labels: ["Per month", "1 year", "5 years", "10 years"],
    q: "After spending ₹9.6 lakh… what do you own?",
    a: "Nothing. With solar, the same money builds an asset on your roof.",
    note: "Illustration based on a constant ₹8,000/month bill.",
  },
  calc: {
    title: "Solar Savings Calculator",
    sub: "Enter the amount from your bi-monthly EB bill to see what size fits your home.",
    bill: "EB bill amount – 2 months (₹)",
    units: "Units used – 2 months",
    size: "Suggested system size",
    gen: "Est. monthly generation",
    subsidy: "Est. subsidy",
    payback: "Rough payback",
    years: "years",
    unitsLbl: "units",
    estimate: "Estimate only – final sizing after free site assessment",
    send: "Send this to WhatsApp",
  },
  sizing: {
    title: "How we size your system",
    items: [
      ["EB Bill", "Your actual consumption pattern"],
      ["Rooftop", "Shadow-free area & orientation"],
      ["Site Conditions", "Structure, access & wiring"],
      ["Future Needs", "More ACs, EV charging"],
    ],
    result: "Personalized capacity",
  },
  quality: {
    title: "Quality components, no shortcuts",
    panels: "Panel brands we work with",
    panelNote: "N-Type TOPCon modules · up to 30-year performance warranty",
    bos: "Inverter & balance of system",
    items: [
      "Deye inverter",
      "Polycab / Havells solar cables",
      "DCDB",
      "ACDB",
      "SPD surge protection",
      "Earthing",
      "MC4 connectors",
      "Hot-dip GI mounting structure",
    ],
    note: "Model recommended based on project & scheme eligibility.",
  },
  how: {
    title: "How solar works at home",
    flow: ["Panels", "DC protection", "Inverter", "AC protection", "Home", "Net meter", "Grid"],
    day: "Day",
    dayText:
      "Panels power your home first. Extra units flow to the grid through the net meter and are credited.",
    night: "Night",
    nightText:
      "Your home draws from the grid, and the units you exported during the day offset that usage.",
  },
  subsidy: {
    title: "Government Subsidy",
    sub: "We handle the full application.",
    cols: ["Capacity", "Central", "Tamil Nadu", "Total"],
    timeline: [
      "Installation",
      "Inspection",
      "Central subsidy (2–3 weeks)",
      "TN subsidy (up to 90 days)",
    ],
    disclaimer: "Amounts follow prevailing scheme rules and may change.",
  },
  process: {
    title: "Our process",
    steps: [
      "Free site assessment",
      "Custom proposal",
      "Expert installation (2–5 days)",
      "Net metering & approvals",
      "Start saving + annual servicing",
    ],
  },
  services: {
    title: "Services",
    items: [
      ["Residential", "Rooftop solar for homes, sized to your bill and family needs."],
      ["Commercial", "Cut operating costs for shops, offices, schools and factories."],
      ["Utility", "Ground-mounted and large-scale solar EPC projects."],
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      [
        "How much does rooftop solar cost?",
        "Cost depends on system size, components and roof. After subsidy, most homes recover the investment through bill savings. Use the calculator or ask us for an exact quote.",
      ],
      [
        "How long does installation take?",
        "Typically 2–5 days on site after the proposal is confirmed.",
      ],
      ["Who handles approvals?", "We do — net metering, EB paperwork and the subsidy application."],
      [
        "What maintenance is needed?",
        "Regular panel cleaning and an annual check-up. We offer annual servicing.",
      ],
      [
        "Will I have power during power cuts?",
        "Standard on-grid systems shut off during outages for safety. Add an optional battery for backup.",
      ],
      [
        "When will I start saving?",
        "From the first billing cycle after net metering is activated.",
      ],
      [
        "How long do panels last?",
        "25+ years, with performance warranties of up to 30 years on select modules.",
      ],
      [
        "Am I eligible for subsidy?",
        "Residential on-grid rooftop systems generally qualify under the current scheme. We check your eligibility for free.",
      ],
      [
        "Why choose Axsun?",
        "Local Erode team, quality components, honest sizing and complete handling from survey to subsidy.",
      ],
    ],
  },
  form: {
    title: "Book your free assessment",
    sub: "Fill this in and it opens WhatsApp with your details ready to send.",
    name: "Name",
    phone: "Phone",
    area: "Area / Town",
    bill: "EB bill – 2 months (₹)",
    roof: "Roof type",
    roofs: ["RCC", "Sheet", "Tiled"],
    upload: "Upload EB bill (optional)",
    uploadHint: "Please attach the bill photo in WhatsApp after it opens.",
    phoneErr: "Please enter a valid 10-digit mobile number.",
    submit: "Send on WhatsApp",
  },
  final: { title: "Let's build a brighter tomorrow together" },
  footer: { rights: "All rights reserved." },
};

type Dict = typeof en;

const ta: Dict = {
  nav: {
    calc: "கணக்கீடு",
    subsidy: "மானியம்",
    process: "செயல்முறை",
    faq: "கேள்விகள்",
    contact: "தொடர்பு",
  },
  cta: "WhatsApp-ல் இலவச சோலார் மதிப்பீடு பெறுங்கள்",
  ctaShort: "WhatsApp",
  call: "அழைக்க",
  hero: {
    title: "பிரகாசமான நாளைக்காக புத்திசாலித்தனமான வீடுகளுக்கு மின்சக்தி.",
    sub: "ஈரோடு & தமிழ்நாட்டில் வீட்டு சோலார் EPC தீர்வுகள்",
    calc: "என் சேமிப்பை கணக்கிடு",
    chips: [
      "குறைந்த மின் கட்டணம்",
      "மின் சுயசார்பு",
      "தூய்மையான சூழல்",
      "நீண்டகால மதிப்பு",
      "நம்பகமான EPC",
    ],
  },
  problem: {
    title: "உங்கள் மின் செலவு தொடர்ந்து அதிகரிக்கிறது",
    labels: ["மாதம்", "1 ஆண்டு", "5 ஆண்டுகள்", "10 ஆண்டுகள்"],
    q: "₹9.6 லட்சம் செலவழித்த பிறகு… உங்களிடம் என்ன உள்ளது?",
    a: "ஒன்றுமில்லை. சோலாருடன், அதே பணம் உங்கள் கூரையில் ஒரு சொத்தாக மாறுகிறது.",
    note: "மாதம் ₹8,000 நிலையான கட்டணத்தின் அடிப்படையிலான விளக்கம்.",
  },
  calc: {
    title: "சோலார் சேமிப்பு கணக்கீடு",
    sub: "உங்கள் இரு மாத மின் கட்டணத் தொகையை உள்ளிட்டு, வீட்டுக்கு ஏற்ற அளவை அறியுங்கள்.",
    bill: "மின் கட்டணம் – 2 மாதம் (₹)",
    units: "பயன்படுத்திய யூனிட் – 2 மாதம்",
    size: "பரிந்துரைக்கப்படும் அளவு",
    gen: "மாத உற்பத்தி (மதிப்பீடு)",
    subsidy: "மானியம் (மதிப்பீடு)",
    payback: "திரும்பப் பெறும் காலம்",
    years: "ஆண்டுகள்",
    unitsLbl: "யூனிட்",
    estimate: "மதிப்பீடு மட்டுமே – இலவச தள ஆய்வுக்குப் பிறகு இறுதி அளவு",
    send: "இதை WhatsApp-க்கு அனுப்பு",
  },
  sizing: {
    title: "உங்கள் அமைப்பின் அளவை எப்படி தீர்மானிக்கிறோம்",
    items: [
      ["மின் கட்டணம்", "உங்கள் உண்மையான பயன்பாடு"],
      ["கூரை", "நிழலில்லா பரப்பு & திசை"],
      ["தள நிலை", "கட்டமைப்பு, அணுகல் & வயரிங்"],
      ["எதிர்கால தேவைகள்", "கூடுதல் AC, EV சார்ஜிங்"],
    ],
    result: "உங்களுக்கேற்ற திறன்",
  },
  quality: {
    title: "தரமான பாகங்கள், சமரசம் இல்லை",
    panels: "நாங்கள் பயன்படுத்தும் பேனல் பிராண்டுகள்",
    panelNote: "N-Type TOPCon பேனல்கள் · 30 ஆண்டு வரை செயல்திறன் உத்தரவாதம்",
    bos: "இன்வெர்ட்டர் & பிற பாகங்கள்",
    items: [
      "Deye இன்வெர்ட்டர்",
      "Polycab / Havells சோலார் கேபிள்கள்",
      "DCDB",
      "ACDB",
      "SPD பாதுகாப்பு",
      "எர்த்திங்",
      "MC4 இணைப்பிகள்",
      "Hot-dip GI மவுண்டிங் அமைப்பு",
    ],
    note: "திட்டம் & திட்டத் தகுதியின் அடிப்படையில் மாடல் பரிந்துரைக்கப்படும்.",
  },
  how: {
    title: "வீட்டில் சோலார் எப்படி வேலை செய்கிறது",
    flow: [
      "பேனல்கள்",
      "DC பாதுகாப்பு",
      "இன்வெர்ட்டர்",
      "AC பாதுகாப்பு",
      "வீடு",
      "நெட் மீட்டர்",
      "கிரிட்",
    ],
    day: "பகல்",
    dayText:
      "பேனல்கள் முதலில் உங்கள் வீட்டுக்கு மின்சாரம் தருகின்றன. மீதமுள்ள யூனிட்கள் நெட் மீட்டர் வழியாக கிரிட்டுக்கு சென்று வரவு வைக்கப்படும்.",
    night: "இரவு",
    nightText:
      "உங்கள் வீடு கிரிட்டிலிருந்து மின்சாரம் பெறுகிறது; பகலில் அனுப்பிய யூனிட்கள் அதை ஈடுசெய்கின்றன.",
  },
  subsidy: {
    title: "அரசு மானியம்",
    sub: "முழு விண்ணப்பத்தையும் நாங்களே கவனிக்கிறோம்.",
    cols: ["திறன்", "மத்திய அரசு", "தமிழ்நாடு", "மொத்தம்"],
    timeline: ["நிறுவல்", "ஆய்வு", "மத்திய மானியம் (2–3 வாரங்கள்)", "TN மானியம் (90 நாட்கள் வரை)"],
    disclaimer: "தொகைகள் நடப்பு திட்ட விதிகளின்படி; மாறக்கூடும்.",
  },
  process: {
    title: "எங்கள் செயல்முறை",
    steps: [
      "இலவச தள ஆய்வு",
      "தனிப்பயன் முன்மொழிவு",
      "நிபுணர் நிறுவல் (2–5 நாட்கள்)",
      "நெட் மீட்டரிங் & அனுமதிகள்",
      "சேமிப்பு தொடக்கம் + ஆண்டு சேவை",
    ],
  },
  services: {
    title: "சேவைகள்",
    items: [
      ["வீடுகள்", "உங்கள் கட்டணம் & குடும்பத் தேவைக்கேற்ற கூரை சோலார்."],
      ["வணிகம்", "கடைகள், அலுவலகங்கள், பள்ளிகள், தொழிற்சாலைகளுக்கு செலவு குறைப்பு."],
      ["பெரிய திட்டங்கள்", "நிலத்தில் அமைக்கும் பெரிய அளவிலான சோலார் EPC."],
    ],
  },
  faq: {
    title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    items: [
      [
        "கூரை சோலார் விலை எவ்வளவு?",
        "அளவு, பாகங்கள், கூரையைப் பொறுத்தது. மானியத்திற்குப் பிறகு பெரும்பாலான வீடுகள் மின் சேமிப்பால் முதலீட்டை திரும்பப் பெறுகின்றன. சரியான விலைக்கு எங்களை கேளுங்கள்.",
      ],
      ["நிறுவ எவ்வளவு நாள் ஆகும்?", "முன்மொழிவு உறுதியான பின் பொதுவாக 2–5 நாட்கள்."],
      ["அனுமதிகளை யார் கவனிப்பார்?", "நாங்களே — நெட் மீட்டரிங், EB ஆவணங்கள், மானிய விண்ணப்பம்."],
      [
        "பராமரிப்பு என்ன தேவை?",
        "அவ்வப்போது பேனல் சுத்தம் மற்றும் ஆண்டு சோதனை. ஆண்டு சேவை வழங்குகிறோம்.",
      ],
      [
        "மின்தடையின் போது மின்சாரம் கிடைக்குமா?",
        "சாதாரண on-grid அமைப்பு பாதுகாப்புக்காக நின்றுவிடும். பேக்கப்புக்கு விருப்ப பேட்டரி சேர்க்கலாம்.",
      ],
      ["எப்போது சேமிப்பு தொடங்கும்?", "நெட் மீட்டர் செயல்பட்ட முதல் பில்லிங் சுழற்சியிலிருந்து."],
      [
        "பேனல்கள் எவ்வளவு காலம் நீடிக்கும்?",
        "25+ ஆண்டுகள்; சில பேனல்களுக்கு 30 ஆண்டு வரை உத்தரவாதம்.",
      ],
      [
        "எனக்கு மானியம் கிடைக்குமா?",
        "வீட்டு on-grid கூரை அமைப்புகள் பொதுவாக தகுதி பெறும். இலவசமாக சரிபார்க்கிறோம்.",
      ],
      [
        "ஏன் Axsun?",
        "உள்ளூர் ஈரோடு குழு, தரமான பாகங்கள், நேர்மையான அளவீடு, ஆய்வு முதல் மானியம் வரை முழு பொறுப்பு.",
      ],
    ],
  },
  form: {
    title: "இலவச மதிப்பீட்டை பதிவு செய்யுங்கள்",
    sub: "இதை நிரப்பினால் உங்கள் விவரங்களுடன் WhatsApp திறக்கும்.",
    name: "பெயர்",
    phone: "தொலைபேசி",
    area: "பகுதி / ஊர்",
    bill: "மின் கட்டணம் – 2 மாதம் (₹)",
    roof: "கூரை வகை",
    roofs: ["RCC", "ஷீட்", "ஓடு"],
    upload: "மின் கட்டண ரசீது (விருப்பம்)",
    uploadHint: "WhatsApp திறந்ததும் ரசீது புகைப்படத்தை இணைக்கவும்.",
    phoneErr: "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
    submit: "WhatsApp-ல் அனுப்பு",
  },
  final: { title: "பிரகாசமான நாளையை ஒன்றாக உருவாக்குவோம்" },
  footer: { rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை." },
};

const dicts = { en, ta };
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

const LANG_KEY = "axsun-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  // Restore the visitor's last choice after hydration (server always renders English).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "ta") setLang(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);
  return <Ctx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</Ctx.Provider>;
}
export const useT = () => useContext(Ctx);
