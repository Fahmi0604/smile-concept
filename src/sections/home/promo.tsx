import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PromoCard } from "@/components/PromoCard";

const INSURANCE_LOGOS = [
  { src: "/assets/smile-concept/Allianz.png", alt: "Allianz" },
  { src: "/assets/smile-concept/Zurich.png", alt: "Zurich" },
  { src: "/assets/smile-concept/BCA.png", alt: "BCA Life" },
  { src: "/assets/smile-concept/CHUBB.png", alt: "CHUBB" },
  { src: "/assets/smile-concept/AdMedika.png", alt: "AdMedika" },
  { src: "/assets/smile-concept/AIA.png", alt: "AIA" },
];

/** Jumlah kartu promo yang tampil di home; selebihnya ada di /promo. */
const HOME_PROMO_LIMIT = 3;

export default function Promo({
  settings,
  promos,
}: {
  settings: Setting;
  promos: Promo[];
}) {
  const bookHref = settings?.link_whatsapp || "https://wa.me/";
  const cards = promos.slice(0, HOME_PROMO_LIMIT);

  return (
    <section
      id="promo"
      aria-labelledby="promo-title"
      className="bg-surface pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]"
    >
      <Shell as="div" className="flex flex-col">
        <div className="flex items-center justify-between gap-6 mb-20 max-md:mb-8">
          <h2 id="promo-title" className="h2 text-ink">
            Special Limited Promo
          </h2>
          <Link href="/promo" className="btn-outline button-large max-md:hidden">
            See all promos
            <ArrowRightIcon />
          </Link>
        </div>

        {cards.length > 0 && (
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
            {cards.map((promo) => (
              <PromoCard key={promo.id} promo={promo} bookHref={bookHref} />
            ))}
          </div>
        )}

        <hr
          aria-hidden="true"
          className="m-0 mt-16 mb-12 border-0 border-t border-ink/20"
        />

        <div className="flex flex-col gap-10">
          <p className="m-0 font-subhead text-[24px] font-medium leading-[1.2] text-ink">
            We welcome insurance claims
          </p>
          <div className="promo-mask relative overflow-hidden" aria-label="Insurance partners">
            <div className="promo-marquee-track flex w-max">
              <InsuranceList />
              <InsuranceList ariaHidden />
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function InsuranceList({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      role={ariaHidden ? "presentation" : "list"}
      aria-hidden={ariaHidden || undefined}
      className="m-0 flex shrink-0 list-none flex-nowrap items-center gap-10 p-0 pr-10 max-md:gap-6 max-md:pr-6"
    >
      {INSURANCE_LOGOS.map((logo, i) => (
        <li key={`${logo.alt}-${i}`} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            className="block h-12 w-auto max-w-[140px] object-contain max-md:h-9"
          />
        </li>
      ))}
    </ul>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
