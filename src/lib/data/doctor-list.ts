// Smile Concept doctor roster for the /doctors listing.
// `slug` present → links to an internal detail page (/doctors/{slug});
// otherwise the card CTA points to WhatsApp.

export type DoctorListItem = {
  name: string;
  specialty: string;
  image: string;
  alt: string;
  slug?: string;
};

export const doctorList: DoctorListItem[] = [
  {
    name: "drg. Kalya Putri, Sp.KG",
    specialty: "Dokter gigi spesialis konservasi gigi",
    image: "/assets/smile-concept/Kalya.jpg",
    alt: "drg. Kalya Putri, Sp.KG",
    slug: "kalya",
  },
  {
    name: "drg. Lidya Wati Budhy, Sp.Ort",
    specialty: "Dokter gigi spesialis ortodonti",
    image: "/assets/smile-concept/Lidya.jpg",
    alt: "drg. Lidya Wati Budhy, Sp.Ort",
    slug: "lidya",
  },
  {
    name: "drg. Grestyasanti Wimasan, Sp.KG",
    specialty: "Dokter gigi spesialis konservasi gigi",
    image: "/assets/smile-concept/Grestyasanti.jpg",
    alt: "drg. Grestyasanti Wimasan, Sp.KG",
    slug: "grestyasanti",
  },
  {
    name: "drg. Ines Augustina S, Sp.Perio",
    specialty: "Dokter gigi spesialis periodonsia",
    image: "/assets/smile-concept/Ines.jpg",
    alt: "drg. Ines Augustina S, Sp.Perio",
    slug: "ines",
  },
  {
    name: "drg. Awaludin Wibawa, Sp.BM",
    specialty: "Dokter gigi spesialis bedah mulut",
    image: "/assets/smile-concept/Awaludin.jpg",
    alt: "drg. Awaludin Wibawa, Sp.BM",
    slug: "awaludin",
  },
  {
    name: "drg. Albar Abshar Muhamad, Sp.Pros",
    specialty: "Dokter gigi spesialis prostodonti",
    image: "/assets/smile-concept/Albar.jpg",
    alt: "drg. Albar Abshar Muhamad, Sp.Pros",
    slug: "albar",
  },
  {
    name: "drg. Qaiszara Puspadewi",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Qaiszara.jpg",
    alt: "drg. Qaiszara Puspadewi",
    slug: "qaiszara",
  },
  {
    name: "drg. Kartika Devy",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Kartika.jpg",
    alt: "drg. Kartika Devy",
    slug: "kartika",
  },
  {
    name: "drg. Julia Dharmawan",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Julia.jpg",
    alt: "drg. Julia Dharmawan",
    slug: "julia",
  },
  {
    name: "drg. Kevin Brianshah",
    specialty: "Dokter gigi umum",
    image: "/assets/smile-concept/Kevin.jpg",
    alt: "drg. Kevin Brianshah",
    slug: "kevin",
  },
  {
    name: "drg. Benazir Amriza Dini, Sp.Ort.",
    specialty: "Dokter gigi spesialis ortodonti",
    image: "/assets/smile-concept/Benazir.jpg",
    alt: "drg. Benazir Amriza Dini, Sp.Ort.",
    slug: "benazir",
  },
];
