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
  /** Optional fine-tuning on top of the pre-cropped file (defaults are
   *  no-ops, so leaving them unset keeps the crop as-authored).
   *  - imageScale: zoom factor ("1" = none). Keep ≤ ~1.3 to stay sharp.
   *  - imageOrigin: "X Y" — the photo point that stays pinned while
   *    zooming; moving X pans the window left/right, Y up/down. */
  imageOrigin?: string;
  imageScale?: string;
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
    image: "/assets/smile-concept/Kalya.jpg",
    imageAlt: "drg. Kalya Putri, Sp.KG",
    imageScale: "1.2",
    imageOrigin: "75% 70%",
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

  "lidya": {
    slug: "lidya",
    name: "drg. Lidya Wati Budhy, Sp.Ort",
    specialty: "Dokter gigi spesialis ortodonti",
    image: `/assets/smile-concept/Lidya.jpg`,
    imageAlt: `drg. Lidya Wati Budhy, Sp.Ort`,
    imageScale: "1.2",
    imageOrigin: "center 90%",
    schedule: [
      { day: "Jumat", time: "11.00 - 18.00 WIB" },
      { day: "Minggu", time: "10.00 - 17.00 WIB" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2013)",
      "Pendidikan Kedokteran Gigi Spesialis Ortodonsia Universitas Indonesia (2024)",
    ],
    expertise: [
      "Pemeriksaan dan konsultasi",
      "Perawatan kawat gigi cekat",
      "Perawatan kawat gigi lepasan",
      "Clear aligner (Invisalign)",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "grestyasanti": {
    slug: "grestyasanti",
    name: "drg. Grestyasanti Wimasan, Sp.KG",
    specialty: "Dokter gigi spesialis konservasi gigi",
    image: `/assets/smile-concept/Grestyasanti.jpg`,
    imageAlt: `drg. Grestyasanti Wimasan, Sp.KG`,
    imageScale: "1.2",
    imageOrigin: "center 100%",
    schedule: [
      { day: "Senin", time: "10.00 - 12.00 WIB" },
      { day: "Sabtu", time: "(by appointment)" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2015)",
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
  "ines": {
    slug: "ines",
    name: "drg. Ines Augustina S, Sp.Perio",
    specialty: "Dokter gigi spesialis periodonsia",
    image: `/assets/smile-concept/Ines.jpg`,
    imageAlt: `drg. Ines Augustina S, Sp.Perio`,
    imageScale: "1.2",
    imageOrigin: "75% 70%",
    schedule: [
      { day: "(by appointment)", time: "" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2014)",
      "Pendidikan Kedokteran Gigi Spesialis Periodonsia Universitas Indonesia (2022)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Dental Spa",
      "Perawatan Gusi Estetik, Bedah Gusi dan Tulang Penyangga Gigi",
      "Dental Implant",
      "Perawatan Gigi Goyang",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "awaludin": {
    slug: "awaludin",
    name: "drg. Awaludin Wibawa, Sp.BM",
    specialty: "Dokter gigi spesialis bedah mulut",
    image: `/assets/smile-concept/Awaludin.jpg`,
    imageAlt: `drg. Awaludin Wibawa, Sp.BM`,
    imageScale: "1.2",
    imageOrigin: "75% center",
    schedule: [
      { day: "(by appointment)", time: "" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2014)",
      "Magister Pendidikan Biologi Oral Chulalongkorn University",
      "Pendidikan Kedokteran Gigi Spesialis Bedah Mulut dan Maksilofasial Universitas Indonesia (2024)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Pencabutan gigi, Odontektomi (operasi gigi bungsu)",
      "Penanganan Trauma Rahang dan Wajah",
      "Bedah Kista dan Tumor",
      "Dental Implant",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "albar": {
    slug: "albar",
    name: "drg. Albar Abshar Muhamad, Sp.Pros",
    specialty: "Dokter gigi spesialis prostodonti",
    image: `/assets/smile-concept/Albar.jpg`,
    imageAlt: `drg. Albar Abshar Muhamad, Sp.Pros`,
    imageOrigin: "0% center",
    schedule: [
      { day: "(by appointment)", time: "" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2019)",
      "Pendidikan Kedokteran Gigi Spesialis Prostodonsia Universitas Indonesia (2024)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Gigi Palsu Lepasan, Gigi Tiruan Jembatan",
      "Dental Implant",
      "Full Mouth Rehabilitation",
      "Perawatan Nyeri Sendi Rahang",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "qaiszara": {
    slug: "qaiszara",
    name: "drg. Qaiszara Puspadewi",
    specialty: "Dokter gigi umum",
    image: `/assets/smile-concept/Qaiszara.jpg`,
    imageAlt: `drg. Qaiszara Puspadewi`,
    imageOrigin: "90% 80%",
    imageScale: "1.2",
    schedule: [
      { day: "Rabu", time: "10.00 - 20.00 WIB" },
      { day: "Minggu", time: "13.30 - 17.00 WIB" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2022)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Dental Spa",
      "Penambalan Gigi",
      "Pencabutan Gigi",
      "Perawatan Gigi Anak",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "kartika": {
    slug: "kartika",
    name: "drg. Kartika Devy",
    specialty: "Dokter gigi umum",
    image: `/assets/smile-concept/Kartika.jpg`,
    imageAlt: `drg. Kartika Devy`,
    imageOrigin: "10% center",
    imageScale: "1.2",
    schedule: [
      { day: "Senin", time: "10.00 - 14.00 WIB (on call)" },
      { day: "Sabtu", time: "10.00 - 15.00 WIB" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2022)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Dental Spa",
      "Penambalan Gigi",
      "Pencabutan Gigi",
      "Perawatan Gigi Anak",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "julia": {
    slug: "julia",
    name: "drg. Julia Dharmawan",
    specialty: "Dokter gigi umum",
    image: `/assets/smile-concept/Julia.jpg`,
    imageAlt: `drg. Julia Dharmawan`,
    schedule: [
      { day: "Senin & Kamis", time: "(by appointment)" },
      { day: "Minggu", time: "10.00 - 13.00 WIB" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2022)",
      "Pendidikan Kedokteran Gigi Spesialis Konservasi Gigi Universitas Indonesia (sedang menjalani)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Dental Spa",
      "Pencabutan Gigi",
      "Perawatan Gigi Anak",
      "Pengobatan Gigi Sensitif, Penambalan Gigi Estetik, Perawatan Saluran Akar, Dental Crown, Veneer, Bleaching, Smile Makeover",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "kevin": {
    slug: "kevin",
    name: "drg. Kevin Brianshah",
    specialty: "Dokter gigi umum",
    image: `/assets/smile-concept/Kevin.jpg`,
    imageAlt: `drg. Kevin Brianshah`,
    imageScale: "1.2",
    imageOrigin: "center 85%",
    schedule: [
      { day: "Senin", time: "12.00 - 16.00 WIB" },
      { day: "Minggu", time: "14.00 - 17.00 WIB" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Indonesia (2022)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Dental Spa",
      "Penambalan Gigi",
      "Pencabutan Gigi",
      "Perawatan Gigi Anak",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
  "benazir": {
    slug: "benazir",
    name: "drg. Benazir Amriza Dini, Sp.Ort.",
    specialty: "Dokter gigi spesialis ortodonti",
    image: `/assets/smile-concept/Benazir.jpg`,
    imageAlt: `drg. Benazir Amriza Dini, Sp.Ort.`,
    imageScale: "1.08",
    imageOrigin: "0% 0%",
    schedule: [
      { day: "Selasa", time: "16.00 - 20.00 WIB" },
      { day: "Sabtu", time: "09.00 - 15.00 WIB" },
    ],
    education: [
      "Pendidikan Kedokteran Gigi Universitas Padjajaran (2020)",
      "Pendidikan Kedokteran Gigi Spesialis Ortodonsia Universitas Indonesia (2025)",
    ],
    expertise: [
      "Pemeriksaan dan Konsultasi",
      "Perawatan Kawat Gigi Cekat",
      "Perawatan Kawat Gigi Lepasan",
      "Clear Aligner (Invisalign)",
    ],
    ctaLabel: "Jadwalkan konsultasi",
  },
};

export const getDoctorDetail = (slug: string): DoctorDetail | undefined =>
  doctorDetails[slug];
