import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { metaData } from "@/lib/utils/metadata";
import { getSettings } from "@/lib/api";
import { getDoctorDetail, doctorDetails, type DoctorDetail } from "@/lib/data/doctor-detail";
import { Shell } from "@/components/Shell";
import JsonLd, { personJsonLd } from "@/lib/components/JsonLd";

export function generateStaticParams() {
  return Object.keys(doctorDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorDetail(slug);

  if (!doctor) {
    return metaData({
      title: "Our Doctors — Smile Concept Dental Clinic",
      description: "Meet the caring doctors at Smile Concept Dental Clinic.",
      images: [{ url: "/assets/smile-concept/Kalya.webp" }],
      path: "/doctors",
    });
  }

  return metaData({
    title: `${doctor.name} — Smile Concept Dental Clinic`,
    description: `${doctor.name}, ${doctor.specialty} at Smile Concept Dental Clinic.`,
    images: [{ url: doctor.image }],
    path: `/doctors/${slug}`,
  });
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = getDoctorDetail(slug);

  if (!doctor) notFound();

  const settings = await getSettings();
  const bookHref = settings.data?.link_whatsapp || "https://wa.me/";

  return (
    <>
      <JsonLd jsonLd={personJsonLd(doctor, slug)} />
      <section className="bg-white pt-30 pb-10 md:pt-[148px] md:pb-14">
        <Shell as="div">
          <h1 className="h2 text-ink mb-2">{doctor.name}</h1>
          <p className="mb-8 font-body text-[18px] leading-[1.4] text-ink/60">
            {doctor.specialty}
          </p>
          <div className="flex gap-12 max-md:gap-8">
            {doctor.schedule.map((slot) => (
              <div key={slot.day} className="flex flex-col gap-1">
                <span className="font-body text-[18px] leading-[1.4] text-ink/60">
                  {slot.day}
                </span>
                {slot.time && (
                  <span className="font-subhead text-[24px] font-medium leading-[1.3] text-ink">
                    {slot.time}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Shell>
      </section>

      <section className="bg-white pb-24 max-md:pb-16">
        <Shell as="div">
          <div className="grid grid-cols-1 overflow-hidden rounded-[20px] bg-emphasize md:grid-cols-2 md:min-h-[480px] md:max-h-[600px]">
            <div className="relative overflow-hidden max-md:h-80">
              <Image
                src={doctor.image}
                alt={doctor.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
                // Optional per-doctor fine-tuning (doctor-detail.ts).
                // Defaults are no-ops: scale 1 + center origin renders the
                // pre-cropped file exactly as authored.
                style={{
                  transform: `scale(${doctor.imageScale ?? "1"})`,
                  transformOrigin: doctor.imageOrigin ?? "center",
                }}
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-7 px-6 pt-7 pb-8 md:px-8 md:py-9 lg:pt-12 lg:pr-12 lg:pb-12 lg:pl-11">
              <Section heading="Pendidikan" items={doctor.education} />
              <Section heading="Speciality" items={doctor.expertise} />
              <Link
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`${slug}-consult`}
                className="btn-primary button-large mt-auto self-start max-md:w-full max-md:justify-center"
              >
                {doctor.ctaLabel}
              </Link>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}

function Section({ heading, items }: { heading: string; items: DoctorDetail["education"] }) {
  return (
    <div>
      <h2 className="mb-3 font-subhead text-[20px] font-semibold leading-[1.3] text-ink">
        {heading}
      </h2>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 font-body text-[16px] leading-[1.5] text-ink before:shrink-0 before:text-ink before:content-['·']"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
