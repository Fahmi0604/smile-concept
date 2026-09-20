import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/components/Shell";

export default function HomeHero({ settings }: { settings: Setting }) {
  const bookHref = settings?.link_whatsapp || "https://wa.me/";

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-white md:min-h-[680px]"
    >
      <div className="absolute inset-0 -z-[3]" aria-hidden="true">
        <Image
          src="/assets/smile-concept/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 -z-[2]",
          "bg-[linear-gradient(to_right,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.7)_35%,rgba(255,255,255,0.15)_60%,rgba(255,255,255,0)_75%)]",
          "max-md:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.7)_55%,rgba(255,255,255,0)_70%)]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-[1]",
          "bg-[linear-gradient(336deg,rgba(255,255,255,0)_0%,rgba(209,231,246,0.25)_35%,rgba(209,231,246,0.6)_70%,rgba(209,231,246,0.9)_100%)]",
          "max-md:bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(209,231,246,0.25)_35%,rgba(209,231,246,0.6)_70%,rgba(209,231,246,0.9)_100%)]",
        ].join(" ")}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/smile-concept/woman-hero.png"
        alt="Smiling young woman holding a phone and a coffee cup"
        className="pointer-events-none absolute right-16 top-[87px] hidden h-[124%] w-auto select-none lg:block"
      />

      <Shell className="relative flex flex-col pt-24 pb-0 md:pt-28 md:pb-14 lg:pt-[190px] lg:pb-[80px]">
        <div className="flex w-full min-w-0 flex-col gap-3 md:max-w-[760px]">
          <p className="h3-subheadline text-ink">Designed for confidence in every moment</p>
          <h1
            id="hero-title"
            className={["h1-display text-ink flex w-full flex-row items-center justify-start gap-5 leading-none",
              // Prototype overrides the display scale for the hero only:
              // 72px from tablet up, clamp(32–48px) on mobile.
              "md:text-[72px]",
              "max-md:gap-3 max-md:text-[clamp(32px,10.2vw,48px)] max-md:flex-nowrap",
            ].join(" ")}
          >
            <span className="max-md:whitespace-nowrap">Own Your</span>
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center w-[65px] max-md:w-[clamp(22px,6vw,36px)]"
            >
              <SwooshSvg />
            </span>
            <span className="max-md:whitespace-nowrap">Smile</span>
          </h1>
        </div>

        <p
          className={[
            "body-text text-ink mt-10 max-w-[680px]",
            "max-md:text-[18px] max-md:leading-[1.4] max-md:tracking-[0.02em]",
          ].join(" ")}
        >
          Klinik gigi orthodontic center di Kemang, berfokus pada hasil yang natural, kenyamanan perawatan, dan pengalaman yang terasa personal bagi tiap pasien.
        </p>

        <div
          aria-hidden="true"
          className="order-2 mt-0 h-[340px] w-[calc(100%+48px)] -mx-6 overflow-hidden md:hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/smile-concept/woman-hero.png"
            alt=""
            className="mx-auto block h-full w-3/5 object-cover object-[center_top]"
          />
        </div>

        <Link
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="hero-whatsapp"
          className="btn-primary button-large mt-10 self-start max-md:hidden"
        >
          Book via WhatsApp
        </Link>
      </Shell>
    </section>
  );
}

function SwooshSvg() {
  return (
    <svg
      viewBox="0 0 65 40.0018"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M58.2496 20.0024C43.8592 34.3081 21.4946 33.7315 6.75041 20L0 26.7131C18.4672 44.1432 46.8892 44.7172 65 26.7131L58.2496 20.0024Z"
        fill="#15384F"
      />
    </svg>
  );
}
