import { SITE_URL } from "@/lib/utils/metadata";
import type { DoctorDetail } from "@/lib/data/doctor-detail";

/**
 * Generic JSON-LD script renderer (App Router pattern — `next/head` does not
 * work under app/). Build the schema object with one of the helpers below and
 * pass it in.
 */
export default function JsonLd({ jsonLd }: { jsonLd: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/** BlogPosting schema for /blog/[slug] pages. */
export function blogPostingJsonLd(data: Partial<Post>): object {
  const postUrl = `${SITE_URL}/blog/${data.slug ?? ""}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title ?? "",
    description: data.description ?? "",
    image: data.thumbnail?.url ?? "",
    url: postUrl,
    mainEntityOfPage: postUrl,
    author: {
      "@type": "Person",
      name: data?.author?.name ?? "",
    },
    datePublished: data.published_at ?? "",
    publisher: {
      "@type": "Organization",
      name: "Smile Concept",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/smile-concept/Logo1.png`,
      },
    },
  };
}

/** Dentist (LocalBusiness) schema for the home page — real clinic data from
 *  the CMS settings, with the same fallbacks the Footer uses. */
export function dentistJsonLd(settings?: Setting): object {
  const instagram = settings?.social_media?.instagram;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Smile Concept",
    url: SITE_URL,
    telephone: settings?.phone ?? "+62 811 157 7137",
    image: `${SITE_URL}/assets/smile-concept/Logo1.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address?.street ?? "Jl. Benda Raya No.5",
      addressLocality: settings?.address?.city ?? "Jakarta Selatan",
      addressCountry: "ID",
    },
    ...(instagram ? { sameAs: [instagram] } : {}),
  };
}

/** Person schema for /doctors/[slug] pages — real data from doctor-detail. */
export function personJsonLd(doctor: DoctorDetail, slug: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.specialty,
    image: `${SITE_URL}${doctor.image}`,
    url: `${SITE_URL}/doctors/${slug}`,
    worksFor: {
      "@type": "Dentist",
      name: "Smile Concept",
    },
  };
}
