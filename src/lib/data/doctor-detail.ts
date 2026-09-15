// Smile Concept doctor detail content, keyed by slug.
// Mirrors the prototype's doctor-detail page (kalya.html). Add more slugs as
// detail pages are authored; the listing only links slugs present here.

export type DoctorScheduleSlot = {
  day: string;
  time: string;
};

export type DoctorDetail = {
  slug: string;
  name: string;
  specialty: string;
  image: string;
  imageAlt: string;
  schedule: DoctorScheduleSlot[];
  education: string[];
  expertise: string[];
  ctaLabel: string;
};

export const doctorDetails: Record<string, DoctorDetail> = {
  kalya: {
    slug: "kalya",
    name: "drg. Kalya Putri, Sp.KG",
    specialty: "Dokter gigi spesialis konservasi gigi",
    image: "/assets/smile-concept/Kalya.png",
    imageAlt: "drg. Kalya Putri, Sp.KG",
    schedule: [
      { day: "Senin", time: "10:00 – 14:00" },
      { day: "Jumat", time: "15:00 – 18:00" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2014)",
      "Pendidikan Kedokteran Gigi Spesialis Konservasi Gigi Universitas Indonesia (2024)",
    ],
    expertise: [
      "Pemeriksaan dan konsultasi",
      "Pengobatan Gigi Sensitif",
      "Penambalan Gigi Estetik",
      "Perawatan Saluran Akar",
      "Dental Crown, Veneer, Bleaching, Smile Makeover",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
};

export const getDoctorDetail = (slug: string): DoctorDetail | undefined =>
  doctorDetails[slug];
