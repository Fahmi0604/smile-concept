import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaData } from "@/lib/utils/metadata";
import { getSettings } from "@/lib/api";
import { getTreatmentDetail, treatmentDetails } from "@/lib/data/treatment-detail";
import { Shell } from "@/components/Shell";

export function generateStaticParams() {
  return Object.keys(treatmentDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentDetail(slug);

  if (!treatment) {
    return metaData({
      title: "Treatments — Smile Concept Dental Clinic",
      description:
        "Smile Concept offers a comprehensive range of dental treatments to achieve your best smile and maintain it.",
      images: [{ url: "/assets/smile-concept/ModelTreatment1.png" }],
      path: "/treatments",
    });
  }

  return metaData({
    title: `${treatment.title} — Smile Concept Dental Clinic`,
    description: treatment.description,
    images: [{ url: treatment.heroImage }],
    path: `/treatments/${slug}`,
  });
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = getTreatmentDetail(slug);

  if (!treatment) notFound();

  const settings = await getSettings();
  const bookHref = settings.data?.link_whatsapp || "https://wa.me/";

  return (
    <>
      <section
        aria-labelledby="td-title"
        className="grid grid-cols-1 bg-white md:min-h-[640px] md:grid-cols-2"
      >
        <div
          className={[
            "flex flex-col justify-center gap-7",
            "pt-30 px-6 pb-12",
            "md:pt-[140px] md:pl-12 md:pr-10 md:pb-[72px]",
            "lg:pt-[148px] lg:pl-[116px] lg:pr-14 lg:pb-20",
          ].join(" ")}
        >
          <h1 id="td-title" className="h2 text-ink">
            {treatment.title}
          </h1>
          <p className="body-text text-ink">{treatment.description}</p>
          <div className="flex flex-wrap gap-2.5">
            {treatment.tags.map((tag) => (
              <span
                key={tag}
                className={[
                  "inline-flex items-center rounded-full bg-emphasize px-3.5 py-1.5 text-ink",
                  "font-body text-[18px] leading-[1.4] tracking-[0.02em]",
                  "[box-shadow:0_2px_8px_rgba(0,0,0,0.10)]",
                ].join(" ")}
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cta={`${slug}-consult`}
            className="btn-primary button-large self-start"
          >
            {treatment.ctaLabel}
          </Link>
        </div>

        <div className="relative overflow-hidden max-md:h-80">
          <Image
            src={treatment.heroImage}
            alt={treatment.heroImageAlt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-[center_top]"
          />
        </div>
      </section>

      <section
        aria-labelledby="td-results-title"
        className="bg-emphasize pt-20 pb-24 max-md:pt-14 max-md:pb-[72px]"
      >
        <Shell as="div">
          <h2 id="td-results-title" className="h3-subheadline text-ink mb-10">
            Proven Results
          </h2>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-5">
            {treatment.results.map((result, i) => (
              <article key={i}>
                <div className="mb-3.5 overflow-hidden rounded-2xl">
                  <Image
                    src={result.image}
                    alt={result.alt}
                    width={800}
                    height={1000}
                    sizes="(max-width: 767px) 100vw, 30vw"
                    className="block w-full"
                  />
                </div>
                <p className="font-body text-[18px] leading-[1.4] text-ink">
                  {result.label}
                </p>
              </article>
            ))}
          </div>
        </Shell>
      </section>
    </>
  );
}
