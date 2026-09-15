import { Metadata } from "next";

/** Public origin of the site, without a trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smileconcept.id"
).replace(/\/+$/, "");

interface GenerateMetadataParams {
  title: string;
  description: string;
  images?: { url: string }[];
  path?: string;
  language?: string;
}

export function metaData({
  title,
  description,
  images = [],
  path = "",
  language = "id",
}: GenerateMetadataParams): Metadata {
  const baseUrl = SITE_URL;
  const url = path ? `${baseUrl}${path}` : baseUrl;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: images.map((img) => ({
        // url: img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`,
        url: img.url,
        width: 1200,
        height: 630,
        alt: description,
        type: "image/webp",
      })),
      siteName: "Smile Concept Dental Clinic",
    },
    alternates: {
      languages: {
        [language]: url,
      },
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: images.map((img) => img.url),
    // },
  };
}
