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

  "lidya": {
    slug: "lidya",
    name: "drg. Lidya Wati Budhy, Sp.Ort",
    specialty: "Dokter gigi spesialis ortodonti",
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Lidya.png`,
    imageAlt: "drg. Lidya Wati Budhy, Sp.Ort",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Grestyasanti.png`,
    imageAlt: "drg. Grestyasanti Wimasan, Sp.KG",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Ines.png`,
    imageAlt: "drg. Ines Augustina S, Sp.Perio",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Awaludin.png`,
    imageAlt: "drg. Awaludin Wibawa, Sp.BM",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Albar.png`,
    imageAlt: "drg. Albar Abshar Muhamad, Sp.Pros",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Qaiszara.png`,
    imageAlt: "drg. Qaiszara Puspadewi",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Kartika.png`,
    imageAlt: "drg. Kartika Devy",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Julia.png`,
    imageAlt: "drg. Julia Dharmawan",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Kevin.png`,
    imageAlt: "drg. Kevin Brianshah",
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
    // TODO(assets): reuses the listing photo; brief Final photo lives on
    // Google Drive and must be replaced when delivered.
    image: `/assets/smile-concept/Benazir.png`,
    imageAlt: "drg. Benazir Amriza Dini, Sp.Ort.",
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
