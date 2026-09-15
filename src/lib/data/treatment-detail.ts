// Smile Concept treatment detail content, keyed by slug.
// Mirrors the prototype's treatment-detail page (braces.html). Add more slugs
// here as detail pages are authored; the listing only links slugs present here
// internally (others go to WhatsApp).

export type TreatmentResult = {
  image: string;
  alt: string;
  label: string;
};

export type TreatmentDetail = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  heroImage: string;
  heroImageAlt: string;
  ctaLabel: string;
  results: TreatmentResult[];
};

export const treatmentDetails: Record<string, TreatmentDetail> = {
  braces: {
    slug: "braces",
    title: "Braces",
    description:
      "Perawatan ortodonti untuk merapikan gigi secara bertahap, disesuaikan dengan kebutuhan dan kenyamanan setiap pasien.",
    tags: ["12-24 months", "Monthly adjustments"],
    heroImage: "/assets/smile-concept/Braces.png",
    heroImageAlt: "Close-up of a patient's smile showing metal braces",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Before_after.png",
        alt: "4-month Damon braces progress — before and after",
        label: "4-month Damon Braces Progress",
      },
      {
        image: "/assets/smile-concept/Before_after.png",
        alt: "7-month metal braces progress — before and after",
        label: "7-month Metal Braces Progress",
      },
      {
        image: "/assets/smile-concept/Before_after.png",
        alt: "13-month Damon braces progress — before and after",
        label: "13-month Damon Braces Progress",
      },
    ],
  },
};

export const getTreatmentDetail = (slug: string): TreatmentDetail | undefined =>
  treatmentDetails[slug];
