import Image from "next/image";
import Link from "next/link";

export function PromoCard({ promo, bookHref }: { promo: Promo; bookHref: string }) {
  // A CMS promo may carry its own CTA; otherwise fall back to the clinic's WhatsApp.
  const href = promo.ctaUrl || bookHref;

  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-white">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#d4d3cf]">
        <Image
          src={promo.image}
          alt={promo.alt}
          fill
          sizes="(max-width: 767px) 100vw, 33vw"
          className="block object-cover object-top"
        />
        {promo.badge && (
          <span
            className={[
              "caption absolute top-4 left-4 rounded-full bg-emphasize text-ink",
              "px-3.5 py-1.5",
              "[box-shadow:0_2px_8px_rgba(0,0,0,0.10)]",
            ].join(" ")}
          >
            {promo.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="h4 text-ink mb-3">{promo.title}</h3>
        <ul className="caption m-0 flex flex-1 list-none flex-col gap-1 p-0 text-ink">
          {promo.perks.map((perk) => (
            <li
              key={perk}
              className="flex items-start gap-1.5 before:shrink-0 before:content-['·']"
            >
              {perk}
            </li>
          ))}
        </ul>
        {/* Harga dirender apa adanya dari CMS: sebagian promo tidak punya harga
            tunggal melainkan daftar per-tindakan ("Tambal gigi mulai dari
            250K-550K", dst), jadi baris baru dipertahankan lewat pre-line dan
            teksnya mengecil saat panjang. Kartu juga valid tanpa harga sama
            sekali. */}
        {(promo.priceOriginal || promo.priceCurrent) && (
          <div className="mt-5 mb-4 flex flex-col gap-0.5">
            {promo.priceOriginal && (
              <span className="font-body text-[15px] leading-[1.4] whitespace-pre-line text-ink/50 line-through">
                {promo.priceOriginal}
              </span>
            )}
            {promo.priceCurrent &&
              // Multi-line price = the prototype's per-treatment price list
              // (16px/500, 2px gaps); single price renders big (24px/600).
              (promo.priceCurrent.includes("\n") ? (
                <span className="flex flex-col gap-[2px]">
                  {promo.priceCurrent.split("\n").map((line) => (
                    <span
                      key={line}
                      className="font-subhead text-[16px] font-medium leading-[1.4] text-ink"
                    >
                      {line}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="font-subhead font-semibold whitespace-pre-line text-[24px] leading-[1.2] text-ink">
                  {promo.priceCurrent}
                </span>
              ))}
          </div>
        )}
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={promo.ctaTag}
          className="btn-primary button-small w-full text-white"
        >
          Konsultasi sekarang
        </Link>
      </div>
    </article>
  );
}

export default PromoCard;
