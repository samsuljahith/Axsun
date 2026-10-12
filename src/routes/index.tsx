import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/config/i18n";
import { SITE } from "@/config/site";
import {
  Navbar,
  Hero,
  Problem,
  SavingsCalculator,
  Sizing,
  Quality,
  HowItWorks,
  Subsidy,
  Process,
  Services,
  Installations,
  Faq,
  LeadForm,
  Footer,
  FloatingBars,
} from "@/components/site/Sections";

const title = "Rooftop Solar Installation in Erode | Axsun Renewtech";
const description =
  "Residential, commercial and utility solar EPC in Erode & Tamil Nadu. Free site assessment, subsidy handled, quality panels. Chat on WhatsApp.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Axsun Renewtech",
  slogan: "From Rays to Revolution.",
  telephone: SITE.PHONE_TEL,
  email: SITE.EMAIL,
  founder: "Akmal Ahamed N",
  address: {
    "@type": "PostalAddress",
    streetAddress: "17, Pannadi Thurai Street, B.P. Agraharam",
    addressLocality: "Erode",
    postalCode: "638005",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: "Tamil Nadu",
  image: `${SITE.SITE_URL}${SITE.OG_IMAGE}`,
  logo: `${SITE.SITE_URL}${SITE.LOGO}`,
  ...(SITE.SITE_URL ? { url: SITE.SITE_URL } : {}),
  ...(SITE.INSTAGRAM_URL ? { sameAs: [SITE.INSTAGRAM_URL] } : {}),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE.SITE_URL}${SITE.OG_IMAGE}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE.SITE_URL}${SITE.OG_IMAGE}` },
    ],
    links: SITE.SITE_URL ? [{ rel: "canonical", href: `${SITE.SITE_URL}/` }] : [],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <SavingsCalculator />
        <Sizing />
        <Quality />
        <HowItWorks />
        <Subsidy />
        <Process />
        <Services />
        <Installations />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <FloatingBars />
    </LangProvider>
  );
}
