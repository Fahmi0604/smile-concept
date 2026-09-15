import { Fragment } from "react";
import Link from "next/link";
import { Shell } from "@/components/Shell";

type Stat = {
  value: string;
  label: string;
  /** Tailwind order class applied at `max-md:` to swap mobile grid placement. */
  mobileOrder?: string;
};

const STATS: Stat[] = [
  { value: "4,9 / 5", label: "Google rating" },
  { value: "1000+", label: "Orthodontic cases handled", mobileOrder: "max-md:order-3" },
  { value: "10+ years", label: "Doctor’s experience", mobileOrder: "max-md:order-2" },
  { value: "10+", label: "Insurance partners" },
];

export default function StatsBar({ settings }: { settings: Setting }) {
  const bookHref = settings?.link_whatsapp || "https://wa.me/";

  return (
    <section aria-label="Practice highlights" className="bg-emphasize py-10 max-md:py-4">
      <Shell as="div">
        <Link
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="statsbar-whatsapp"
          className="btn-primary button-large mb-5 flex w-full md:hidden"
        >
          Book via WhatsApp
        </Link>

        <ul className="m-0 flex list-none items-center p-0 max-md:grid max-md:grid-cols-2 max-md:gap-y-6">
          {STATS.map((stat, i) => (
            <Fragment key={stat.label}>
              <li
                className={[
                  "flex shrink-0 flex-col gap-1 text-left",
                  stat.mobileOrder ?? "",
                ].join(" ")}
              >
                <span className="h3-subheadline">{stat.value}</span>
                <span className="caption">{stat.label}</span>
              </li>
              {i < STATS.length - 1 && (
                <li
                  aria-hidden="true"
                  className={[
                    "relative flex-1 self-stretch max-md:hidden",
                    "after:absolute after:left-1/2 after:top-0 after:bottom-0",
                    "after:w-px after:-translate-x-1/2 after:bg-ink after:content-['']",
                  ].join(" ")}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
