import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/components/Shell";

export default function CtaBlock({ settings }: { settings: Setting }) {
  const bookHref = settings?.link_whatsapp || "https://wa.me/";

  return (
    <section
      aria-label="Book an appointment"
      className={[
        "relative isolate flex items-center overflow-hidden min-h-[680px]",
        "max-md:min-h-0 max-md:flex-col max-md:items-stretch",
      ].join(" ")}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-[2]">
        <Image
          src="/assets/smile-concept/Background_CTA.webp"
          alt=""
          fill
          sizes="100vw"
          className="block object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 -z-[1]",
          "bg-[linear-gradient(to_right,rgba(209,231,246,0.85)_0%,rgba(209,231,246,0.55)_35%,rgba(209,231,246,0.15)_60%,rgba(209,231,246,0)_80%)]",
          "max-md:bg-[linear-gradient(to_bottom,rgba(209,231,246,0.9)_0%,rgba(209,231,246,0.6)_50%,rgba(209,231,246,0)_100%)]",
        ].join(" ")}
      />

      <Shell
        as="div"
        className={[
          "relative z-[1] flex flex-col items-start gap-9 py-20",
          "max-md:order-1 max-md:gap-6 max-md:pt-12 max-md:pb-8",
        ].join(" ")}
      >
        <h2 className="h2 text-ink">
          Ready for your new
          <br />
          confident smile?
        </h2>
        <Link
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="ctablock-whatsapp"
          className="btn-primary button-large self-start"
        >
          Book via WhatsApp
        </Link>
      </Shell>
    </section>
  );
}
