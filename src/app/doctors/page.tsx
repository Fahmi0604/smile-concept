import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { metaData } from "@/lib/utils/metadata";
import { getSettings } from "@/lib/api";
import { doctorList, type DoctorListItem } from "@/lib/data/doctor-list";
import { Shell } from "@/components/Shell";
import CtaBlock from "@/sections/home/cta-block";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: "Our Doctors — Smile Concept Dental Clinic",
    description:
      "Meet the caring doctors at Smile Concept Dental Clinic — experienced, patient-focused, and dedicated to your best smile.",
    images: [{ url: "/assets/smile-concept/Kalya.jpg" }],
    path: "/doctors",
  });
}

export default async function DoctorsPage() {
  const settings = await getSettings();
  const bookHref = settings.data?.link_whatsapp || "https://wa.me/";

  return (
    <>
      <section className="bg-surface pt-40 pb-16 max-md:pt-30 max-md:pb-12">
        <Shell as="div">
          <h1 className="h2 text-ink">Our dedicated dentists</h1>
        </Shell>
      </section>

      <section aria-label="Doctor list" className="bg-white pt-[72px] pb-24 max-md:pt-12 max-md:pb-16">
        <Shell as="div">
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
            {doctorList.map((doctor) => (
              <DoctorCard key={doctor.name} doctor={doctor} bookHref={bookHref} />
            ))}
          </div>
        </Shell>
      </section>

      <CtaBlock settings={settings.data} />
    </>
  );
}

function DoctorCard({
  doctor,
  bookHref,
}: {
  doctor: DoctorListItem;
  bookHref: string;
}) {
  const isInternal = Boolean(doctor.slug);
  const href = doctor.slug ? `/doctors/${doctor.slug}` : bookHref;

  return (
    <article className="relative flex flex-col overflow-hidden rounded-[20px] bg-emphasize">
      <div className="relative h-[280px] shrink-0 overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-emphasize"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <strong className="mb-0.5 block font-subhead text-[24px] font-medium leading-[1.3] text-ink">
          {doctor.name}
        </strong>
        <span className="mb-3 block font-body text-[16px] leading-[1.4] text-ink/60">
          {doctor.specialty}
        </span>
        <Link
          href={href}
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className={[
            "mt-auto flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5",
            "border border-ink/30 font-subhead text-[16px] font-medium leading-none text-ink no-underline",
            "transition-[background-color,border-color] duration-200 hover:border-ink hover:bg-ink/[0.07]",
            "after:absolute after:inset-0 after:content-['']",
          ].join(" ")}
        >
          Lihat profil &amp; jadwal
          <svg
            width="16"
            height="16"
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
        </Link>
      </div>
    </article>
  );
}
