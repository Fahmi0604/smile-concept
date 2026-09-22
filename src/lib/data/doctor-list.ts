// Smile Concept doctor roster for the /doctors listing.
// `slug` present → links to an internal detail page (/doctors/{slug});
// otherwise the card CTA points to WhatsApp.

export type DoctorListItem = {
  name: string;
  specialty: string;
  image: string;
  alt: string;
  /** object-position for the card photo (framing differs per photo). */
  imagePosition?: string;
  /** transform scale for the card photo. */
  imageScale?: string;
  slug?: string;
};

export const doctorList: DoctorListItem[] = [
  {
    name: "drg. Kalya Putri, Sp.KG",
    specialty: "Dokter gigi spesialis konservasi gigi",
    image: "/assets/smile-concept/Kalya-card.webp",
    alt: "drg. Kalya Putri, Sp.KG",
    imagePosition: "60% 38%",
    imageScale: "2",
    slug: "kalya",
  },
  {
    name: "drg. Lidya Wati Budhy, Sp.Ort",
    specialty: "Dokter gigi spesialis ortodonti",
    image: "/assets/smile-concept/Lidya-card.webp",
    alt: "drg. Lidya Wati Budhy, Sp.Ort",
    imagePosition: "45% 39%",
    imageScale: "2",
    slug: "lidya",
  },
  {
    name: "drg. Grestyasanti Wimasan, Sp.KG",
    specialty: "Dokter gigi spesialis konservasi gigi",
    image: "/assets/smile-concept/Grestyasanti-card.webp",
    alt: "drg. Grestyasanti Wimasan, Sp.KG",
    imagePosition: "center 45%",
    imageScale: "2",
    slug: "grestyasanti",
  },
  {
    name: "drg. Ines Augustina S, Sp.Perio",
    specialty: "Dokter gigi spesialis periodonsia",
    image: "/assets/smile-concept/Ines-card.webp",
    alt: "drg. Ines Augustina S, Sp.Perio",
    imagePosition: "53% 39%",
    imageScale: "2",
    slug: "ines",
  },
  {
    name: "drg. Awaludin Wibawa, Sp.BM",
    specialty: "Dokter gigi spesialis bedah mulut",
    image: "/assets/smile-concept/Awaludin-card.webp",
    alt: "drg. Awaludin Wibawa, Sp.BM",
    imagePosition: "58% 27%",
    imageScale: "2",
    slug: "awaludin",
  },
  {
    name: "drg. Albar Abshar Muhamad, Sp.Pros",
    specialty: "Dokter gigi spesialis prostodonti",
    image: "/assets/smile-concept/Albar-card.webp",
    alt: "drg. Albar Abshar Muhamad, Sp.Pros",
    imagePosition: "60% 31%",
    imageScale: "1.9",
    slug: "albar",
  },
  {
    name: "drg. Qaiszara Puspadewi",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Qaiszara-card.webp",
    alt: "drg. Qaiszara Puspadewi",
    imagePosition: "62% 42%",
    imageScale: "2",
    slug: "qaiszara",
  },
  {
    name: "drg. Kartika Devy",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Kartika-card.webp",
    alt: "drg. Kartika Devy",
    imagePosition: "38% 35%",
    imageScale: "2",
    slug: "kartika",
  },
  {
    name: "drg. Julia Dharmawan",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Julia-card.webp",
    alt: "drg. Julia Dharmawan",
    imagePosition: "48% 53%",
    imageScale: "2",
    slug: "julia",
  },
  {
    name: "drg. Kevin Brianshah",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Kevin-card.webp",
    alt: "drg. Kevin Brianshah",
    imagePosition: "center 36%",
    imageScale: "2",
    slug: "kevin",
  },
  {
    name: "drg. Benazir Amriza Dini, Sp.Ort.",
    specialty: "Dokter gigi spesialis ortodonti",
    image: "/assets/smile-concept/Benazir-card.webp",
    alt: "drg. Benazir Amriza Dini, Sp.Ort.",
    imagePosition: "57% 16%",
    imageScale: "2",
    slug: "benazir",
  },
];
