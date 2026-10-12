import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Sun,
  Moon,
  Check,
  ArrowRight,
  Home,
  Building2,
  Factory,
  Calculator,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useT } from "@/config/i18n";
import {
  SITE,
  SUBSIDY,
  HAS_STATE_SUBSIDY,
  calcResult,
  monthlyUnitsFrom,
  isIndianMobile,
  waLink,
  inr,
} from "@/config/site";
import hero from "@/assets/hero-solar.jpg";

const wa = () => waLink(SITE.DEFAULT_WA_MESSAGE);

export function WaButton({
  children,
  href,
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  className?: string;
}) {
  const { t } = useT();
  return (
    <a
      href={href ?? wa()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-wa px-6 py-3.5 font-display text-sm font-bold text-primary-foreground shadow-soft transition hover:brightness-110 ${className}`}
    >
      <MessageCircle className="h-5 w-5 shrink-0" />
      {children ?? t.cta}
    </a>
  );
}

function Section({ id, tint, children }: { id?: string; tint?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`px-4 py-16 md:py-24 ${tint ? "bg-tint" : ""}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
function H2({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-extrabold text-navy md:text-4xl">{children}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e?.isIntersecting && setV(true), {
      threshold: 0.3,
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v] as const;
}

export function Navbar() {
  const { t, lang, setLang } = useT();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src={SITE.MARK} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold tracking-wider text-navy">
              AXSUN
            </span>
            <span className="block font-display text-[10px] font-bold tracking-[0.35em] text-brand-bright">
              RENEWTECH
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {(["calc", "subsidy", "process", "faq", "contact"] as const).map((k) => (
            <a key={k} href={`#${k}`} className="hover:text-brand">
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border p-0.5 text-xs font-semibold">
            {(["en", "ta"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 ${lang === l ? "bg-brand text-primary-foreground" : ""}`}
              >
                {l === "en" ? "EN" : "தமிழ்"}
              </button>
            ))}
          </div>
          <a
            href={wa()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-wa px-4 py-2 text-sm font-bold text-primary-foreground lg:inline-flex"
          >
            {t.ctaShort}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative overflow-hidden bg-tint">
      <div className="absolute inset-0 bg-glow" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 font-display text-sm font-semibold tracking-widest text-brand-bright">
            FROM RAYS TO REVOLUTION.
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t.hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WaButton />
            <a
              href="#calc"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand px-6 py-3 font-display text-sm font-bold text-brand hover:bg-brand hover:text-primary-foreground"
            >
              <Calculator className="h-5 w-5" />
              {t.hero.calc}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {t.hero.chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-xs font-semibold shadow-soft"
              >
                <Check className="h-3.5 w-3.5 text-brand-bright" />
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 rotate-2 rounded-3xl bg-sun-gradient opacity-80" />
          <img
            src={hero}
            alt="Rooftop solar panels on a home in Tamil Nadu"
            width={1600}
            height={1008}
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  const { t } = useT();
  const [ref, v] = useInView<HTMLDivElement>();
  const vals = [8000, 96000, 480000, 960000];
  const disp = ["₹8,000", "₹96,000", "₹4.8L", "₹9.6L"];
  return (
    <Section>
      <H2>{t.problem.title}</H2>
      <div
        ref={ref}
        className="mx-auto flex h-72 max-w-2xl items-end justify-between gap-3 md:gap-6"
      >
        {vals.map((x, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2 h-full">
            <span className="font-display text-sm font-bold text-navy md:text-lg">{disp[i]}</span>
            <div
              className="w-full rounded-t-xl bg-destructive/80 transition-all duration-1000 ease-out"
              style={{
                height: v ? `${Math.max(4, (x / 960000) * 100)}%` : "0%",
                transitionDelay: `${i * 200}ms`,
              }}
            />
            <span className="text-xs text-muted-foreground md:text-sm">{t.problem.labels[i]}</span>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-navy p-6 text-center text-primary-foreground">
        <p className="font-display text-xl font-bold">{t.problem.q}</p>
        <p className="mt-2 opacity-80">{t.problem.a}</p>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{t.problem.note}</p>
    </Section>
  );
}

export function SavingsCalculator() {
  const { t } = useT();
  const [mode, setMode] = useState<"bill" | "units">("bill");
  const [val, setVal] = useState(6000);
  const r = calcResult(monthlyUnitsFrom(mode, val));
  const size = `${r.kw}${r.plus ? "+" : ""} kW`;
  const payback = r.payback === null ? "—" : `~${r.payback.toFixed(1)} ${t.calc.years}`;
  const msg = `Hi Axsun, I used your solar calculator.\n${mode === "bill" ? `EB bill (2 months): ${inr(val)}` : `Units (2 months): ${val}`}\nSuggested size: ${size}\nEst. generation: ${r.gen} units/month\nEst. subsidy: ${inr(r.subsidy)}${r.payback === null ? "" : `\nRough payback: ${r.payback.toFixed(1)} years`}\nPlease book my free site assessment.`;
  return (
    <Section id="calc" tint>
      <H2 sub={t.calc.sub}>{t.calc.title}</H2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-background p-6 shadow-soft md:p-8">
          <div className="mb-6 flex rounded-full bg-tint p-1 text-sm font-semibold">
            {(["bill", "units"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setVal(m === "bill" ? 6000 : 800);
                }}
                className={`flex-1 rounded-full py-2 ${mode === m ? "bg-brand text-primary-foreground" : ""}`}
              >
                {t.calc[m]}
              </button>
            ))}
          </div>
          <label className="block text-sm font-medium text-muted-foreground">{t.calc[mode]}</label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={val}
            aria-label={t.calc[mode]}
            onChange={(e) => setVal(Math.max(0, Number(e.target.value)))}
            className="mt-2 w-full rounded-xl border-2 px-4 py-3 font-display text-2xl font-bold focus:border-brand focus:outline-none"
          />
          <input
            type="range"
            min={mode === "bill" ? 1000 : 100}
            max={mode === "bill" ? 40000 : 5000}
            step={mode === "bill" ? 200 : 20}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="mt-6 w-full accent-brand"
          />
        </div>
        <div className="rounded-3xl bg-navy p-6 text-primary-foreground shadow-soft md:p-8">
          <p className="text-sm opacity-70">{t.calc.size}</p>
          <p className="font-display text-5xl font-extrabold text-sun">{size}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              [t.calc.gen, `${r.gen} ${t.calc.unitsLbl}`],
              [t.calc.subsidy, inr(r.subsidy)],
              [t.calc.payback, payback],
            ].map(([a, b]) => (
              <div key={a} className="rounded-xl bg-primary-foreground/10 p-3">
                <p className="text-[11px] opacity-70">{a}</p>
                <p className="mt-1 font-display text-sm font-bold md:text-base">{b}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs opacity-70">⚠ {t.calc.estimate}</p>
          <WaButton href={waLink(msg)} className="mt-5 w-full">
            {t.calc.send}
          </WaButton>
        </div>
      </div>
    </Section>
  );
}

export function Sizing() {
  const { t } = useT();
  return (
    <Section>
      <H2>{t.sizing.title}</H2>
      <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="grid grid-cols-2 gap-4">
          {t.sizing.items.map(([a, b]) => (
            <div key={a} className="rounded-2xl border bg-background p-5 shadow-soft">
              <p className="font-display font-bold text-navy">{a}</p>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
        <ArrowRight className="mx-auto h-8 w-8 rotate-90 text-brand-bright md:rotate-0" />
        <div className="rounded-3xl bg-sun-gradient p-8 text-center text-primary-foreground shadow-soft">
          <Sun className="mx-auto h-10 w-10" />
          <p className="mt-3 font-display text-2xl font-extrabold">{t.sizing.result}</p>
        </div>
      </div>
    </Section>
  );
}

export function Quality() {
  const { t } = useT();
  const brands = ["Waaree", "Goldi", "Adani", "Vikram", "RenewSys", "Premier Energies", "Emmvee"];
  return (
    <Section tint>
      <H2>{t.quality.title}</H2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-background p-6 shadow-soft md:p-8">
          <h3 className="font-bold text-navy">{t.quality.panels}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {brands.map((b) => (
              <span
                key={b}
                className="rounded-lg border-2 border-brand/20 px-3 py-1.5 font-display text-sm font-semibold"
              >
                {b}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm font-medium text-brand">{t.quality.panelNote}</p>
        </div>
        <div className="rounded-3xl bg-background p-6 shadow-soft md:p-8">
          <h3 className="font-bold text-navy">{t.quality.bos}</h3>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {t.quality.items.map((i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 shrink-0 text-brand-bright" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">{t.quality.note}</p>
    </Section>
  );
}

export function HowItWorks() {
  const { t } = useT();
  return (
    <Section>
      <H2>{t.how.title}</H2>
      <div className="flex flex-col items-center gap-0 md:flex-row md:justify-between">
        {t.how.flow.map((f, i) => (
          <div key={f} className="flex flex-col items-center md:flex-1 md:flex-row">
            <div className="z-10 w-36 rounded-xl bg-navy px-3 py-3 text-center font-display text-xs font-bold text-primary-foreground md:w-full">
              {f}
            </div>
            {i < t.how.flow.length - 1 && (
              <div className="h-6 w-1 flow-line rotate-90 md:h-1 md:w-6 md:rotate-0" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-sun/20 p-6">
          <Sun className="h-8 w-8 text-brand" />
          <h3 className="mt-2 font-bold">{t.how.day}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.how.dayText}</p>
        </div>
        <div className="rounded-2xl bg-navy p-6 text-primary-foreground">
          <Moon className="h-8 w-8 text-sun" />
          <h3 className="mt-2 font-bold">{t.how.night}</h3>
          <p className="mt-1 text-sm opacity-80">{t.how.nightText}</p>
        </div>
      </div>
    </Section>
  );
}

export function Subsidy() {
  const { t } = useT();
  return (
    <Section id="subsidy" tint>
      <H2 sub={t.subsidy.sub}>{t.subsidy.title}</H2>
      <div className="overflow-hidden rounded-2xl bg-background shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand text-primary-foreground">
            <tr>
              {t.subsidy.cols
                .filter((_, i) => HAS_STATE_SUBSIDY || i !== 2)
                .map((c) => (
                  <th key={c} className="px-4 py-3 font-display">
                    {c}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {SUBSIDY.map((r) => (
              <tr key={r.label} className="border-t">
                <td className="px-4 py-3 font-semibold">{r.label}</td>
                <td className="px-4 py-3">{inr(r.central)}</td>
                {HAS_STATE_SUBSIDY && <td className="px-4 py-3">{inr(r.state)}</td>}
                <td className="px-4 py-3 font-bold text-brand">{inr(r.central + r.state)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ol className={`mt-8 grid gap-3 ${HAS_STATE_SUBSIDY ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
        {t.subsidy.timeline
          .filter((_, i) => HAS_STATE_SUBSIDY || i !== 3)
          .map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-soft"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sun font-display font-bold text-navy">
                {i + 1}
              </span>
              <span className="text-sm font-medium">{s}</span>
            </li>
          ))}
      </ol>
      <p className="mt-4 text-center text-xs text-muted-foreground">{t.subsidy.disclaimer}</p>
    </Section>
  );
}

export function Process() {
  const { t } = useT();
  return (
    <Section id="process">
      <H2>{t.process.title}</H2>
      <ol className="grid gap-4 md:grid-cols-5">
        {t.process.steps.map((s, i) => (
          <li key={s} className="rounded-2xl border bg-background p-5 shadow-soft">
            <span className="font-display text-3xl font-extrabold text-sun-gradient">0{i + 1}</span>
            <p className="mt-2 font-semibold">{s}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Services() {
  const { t } = useT();
  const icons = [Home, Building2, Factory];
  return (
    <Section tint>
      <H2>{t.services.title}</H2>
      <div className="grid gap-4 md:grid-cols-3">
        {t.services.items.map(([a, b], i) => {
          const I = icons[i]!;
          return (
            <div key={a} className="rounded-3xl bg-background p-6 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sun-gradient text-primary-foreground">
                <I />
              </div>
              <h3 className="mt-4 text-xl font-bold">{a}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// Hidden until real installation photos are available. Set SHOW_GALLERY to true and add photos.
const SHOW_GALLERY = false;
export function Installations() {
  if (!SHOW_GALLERY) return null;
  return (
    <Section>
      <H2>Our Installations</H2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3" />
    </Section>
  );
}

export function Faq() {
  const { t } = useT();
  return (
    <Section id="faq">
      <H2>{t.faq.title}</H2>
      <Accordion type="single" collapsible className="mx-auto max-w-3xl">
        {t.faq.items.map(([q, a], i) => (
          <AccordionItem key={i} value={`q${i}`}>
            <AccordionTrigger className="text-left font-display font-semibold">
              {q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export function LeadForm() {
  const { t } = useT();
  const [f, setF] = useState({ name: "", phone: "", area: "", bill: "", roof: "" });
  const [file, setFile] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isIndianMobile(f.phone)) {
      setPhoneErr(true);
      return;
    }
    const msg = `Hi Axsun, I'd like a FREE solar assessment.\n\nName: ${f.name}\nPhone: ${f.phone}\nArea/Town: ${f.area}\nEB bill (2 months): ₹${f.bill}\nRoof type: ${f.roof}${file ? "\nEB bill: I'll attach it here." : ""}`;
    // Some in-app browsers (Instagram, Facebook) block popups; fall back to same-tab navigation.
    // (No "noopener" feature here: with it window.open always returns null, which would
    // trigger the fallback as well. Clear the opener manually instead.)
    const w = window.open(waLink(msg), "_blank");
    if (w) w.opener = null;
    else window.location.href = waLink(msg);
  };
  const input = "w-full rounded-xl border-2 px-4 py-3 focus:border-brand focus:outline-none";
  return (
    <Section id="contact" tint>
      <H2 sub={t.form.sub}>{t.form.title}</H2>
      <form
        onSubmit={submit}
        className="mx-auto grid max-w-2xl gap-4 rounded-3xl bg-background p-6 shadow-soft md:grid-cols-2 md:p-8"
      >
        <input
          required
          autoComplete="name"
          placeholder={t.form.name}
          value={f.name}
          onChange={set("name")}
          className={input}
          aria-label={t.form.name}
        />
        <div>
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t.form.phone}
            value={f.phone}
            onChange={(e) => {
              set("phone")(e);
              setPhoneErr(false);
            }}
            className={`${input} ${phoneErr ? "border-destructive" : ""}`}
            aria-label={t.form.phone}
            aria-invalid={phoneErr}
            aria-describedby="phone-err"
          />
          {phoneErr && (
            <p id="phone-err" className="mt-1 text-xs text-destructive">
              {t.form.phoneErr}
            </p>
          )}
        </div>
        <input
          required
          placeholder={t.form.area}
          value={f.area}
          onChange={set("area")}
          className={input}
          aria-label={t.form.area}
        />
        <input
          required
          type="number"
          inputMode="numeric"
          min={0}
          placeholder={t.form.bill}
          value={f.bill}
          onChange={set("bill")}
          className={input}
          aria-label={t.form.bill}
        />
        <select
          required
          value={f.roof}
          onChange={set("roof")}
          className={`${input} md:col-span-2`}
          aria-label={t.form.roof}
        >
          <option value="">{t.form.roof}</option>
          {t.form.roofs.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <label className="md:col-span-2 text-sm">
          <span className="font-medium">{t.form.upload}</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(!!e.target.files?.length)}
            className="mt-2 block w-full text-sm"
          />
          {file && <span className="mt-1 block text-xs text-brand">{t.form.uploadHint}</span>}
        </label>
        <button
          type="submit"
          className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-wa px-6 py-4 font-display font-bold text-primary-foreground shadow-soft hover:brightness-110"
        >
          <MessageCircle className="h-5 w-5" />
          {t.form.submit}
        </button>
      </form>
    </Section>
  );
}

export function Footer() {
  const { t } = useT();
  return (
    <>
      <section className="relative overflow-hidden bg-navy px-4 py-16 text-center text-primary-foreground">
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.final.title}</h2>
          <WaButton className="mt-8" />
        </div>
      </section>
      <footer className="bg-background px-4 pb-28 pt-12 md:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <img
              src={SITE.LOGO}
              alt="Axsun Renewtech"
              width={128}
              height={128}
              className="h-32 w-32 object-contain"
              loading="lazy"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Akmal Ahamed N — Founder & Proprietor
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${SITE.PHONE_TEL}`} className="flex gap-2 hover:text-brand">
                <Phone className="h-4 w-4 text-brand" />
                {SITE.PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.EMAIL}`} className="flex gap-2 break-all hover:text-brand">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                {SITE.EMAIL}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-brand" />
              {SITE.ADDRESS}
            </li>
            <li className="flex gap-4 pt-2">
              {SITE.INSTAGRAM_URL && (
                <a
                  href={SITE.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-brand" />
                </a>
              )}
              <a href={wa()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-6 w-6 text-brand" />
              </a>
            </li>
          </ul>
          <iframe
            title="Axsun Renewtech location"
            src={SITE.MAP_EMBED}
            loading="lazy"
            className="h-48 w-full rounded-2xl border-0"
          />
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Axsun Renewtech. {t.footer.rights}
        </p>
      </footer>
    </>
  );
}

export function FloatingBars() {
  const { t } = useT();
  return (
    <>
      <a
        href={wa()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-wa text-primary-foreground shadow-soft transition hover:scale-110 md:bottom-6"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t bg-background md:hidden">
        <a
          href={`tel:${SITE.PHONE_TEL}`}
          className="flex items-center justify-center gap-2 py-4 font-display font-bold text-navy"
        >
          <Phone className="h-5 w-5" />
          {t.call}
        </a>
        <a
          href={wa()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-wa py-4 font-display font-bold text-primary-foreground"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
