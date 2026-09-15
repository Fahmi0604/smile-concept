import { Metadata } from "next";
import { metaData } from "@/lib/utils/metadata";
import { getSettings, getPromos } from "@/lib/api";
import { Shell } from "@/components/Shell";
import { PromoCard } from "@/components/PromoCard";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: "Promo — Smile Concept Dental Clinic",
    description:
      "Special promos at Smile Concept Dental Clinic — deals on braces, bleaching, implants, veneers, and more.",
    images: [{ url: "/assets/smile-concept/promo-card-img1.png" }],
    path: "/promo",
  });
}

export default async function PromoPage() {
  const [settings, promosRes] = await Promise.all([getSettings(), getPromos()]);
  const bookHref = settings.data?.link_whatsapp || "https://wa.me/";
  const promos = promosRes.data;

  return (
    <>
      <section className="bg-surface pt-40 pb-16 max-md:pt-30 max-md:pb-12">
        <Shell as="div">
          <h1 className="h2 text-ink">Special Promo Offers</h1>
        </Shell>
      </section>

      <section
        aria-label="Available promotions"
        className="bg-white pt-[72px] pb-24 max-md:pt-12 max-md:pb-16"
      >
        <Shell as="div">
          {promos.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-4">
              {promos.map((promo) => (
                <PromoCard key={promo.id} promo={promo} bookHref={bookHref} />
              ))}
            </div>
          ) : (
            <p className="body-text text-ink/60">
              No promos running right now. Check back soon.
            </p>
          )}
        </Shell>
      </section>
    </>
  );
}
