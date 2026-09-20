// Smile Concept treatment detail content, keyed by slug.
// Photos: heroes + before/after wired from the client's delivered assets
// (TD_* files) — all 23 treatments now have real heroes. Treatments with no
// before/after photos render without the Proven Results section.

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
    heroImage: "/assets/smile-concept/TD_braces_hero.jpg",
    heroImageAlt: "Braces",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/TD_braces_ba1.png",
        alt: "4-month Damon Braces Progress",
        label: "4-month Damon Braces Progress",
      },
      {
        image: "/assets/smile-concept/TD_braces_ba2.png",
        alt: "7-month Metal Braces Progress",
        label: "7-month Metal Braces Progress",
      },
      {
        image: "/assets/smile-concept/TD_braces_ba3.png",
        alt: "13-month Damon Braces Progress",
        label: "13-month Damon Braces Progress",
      },
    ],
  },

  "dental-spa": {
    slug: "dental-spa",
    title: "Dental Spa",
    description: "Pembersihan karang gigi dan noda dengan pendekatan yang lebih nyaman dan minim rasa ngilu, untuk membantu menjaga kesehatan gigi sekaligus membuat senyum terlihat lebih segar dan bersih.",
    tags: ["1 visit"],
    heroImage: "/assets/smile-concept/TD_dental-spa_hero.webp",
    heroImageAlt: "Dental Spa",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/TD_dental-spa_ba1.png",
        alt: "Focused deep cleaning to protect your upper teeth and gums.",
        label: "Focused deep cleaning to protect your upper teeth and gums.",
      },
      {
        image: "/assets/smile-concept/TD_dental-spa_ba2.png",
        alt: "Focused deep cleaning to protect your lower teeth and gums.",
        label: "Focused deep cleaning to protect your lower teeth and gums.",
      },
      {
        image: "/assets/smile-concept/TD_dental-spa_ba3.png",
        alt: "Focused deep cleaning to protect your lower teeth and gums.",
        label: "Focused deep cleaning to protect your lower teeth and gums.",
      },
    ],
  },
  "clear-aligner": {
    slug: "clear-aligner",
    title: "Clear Aligner",
    description: "Perawatan aligner transparan untuk membantu merapikan gigi dengan tampilan yang lebih estetik dan nyaman digunakan dalam aktivitas sehari-hari.",
    tags: ["12-24 months"],
    heroImage: "/assets/smile-concept/TD_clear-aligner_hero.avif",
    heroImageAlt: "Clear Aligner",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "bleaching": {
    slug: "bleaching",
    title: "Bleaching",
    description: "Perawatan pemutihan gigi untuk membantu mengurangi tampilan gigi kusam atau menguning, sehingga senyum terlihat lebih cerah dan fresh secara natural.",
    tags: ["1 visit"],
    heroImage: "/assets/smile-concept/TD_bleaching_hero.webp",
    heroImageAlt: "Bleaching",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/TD_bleaching_ba1.png",
        alt: "Effortlessly erase stains.",
        label: "Effortlessly erase stains.",
      },
      {
        image: "/assets/smile-concept/TD_bleaching_ba2.png",
        alt: "Professional whitening for a radiant smile.",
        label: "Professional whitening for a radiant smile.",
      },
      {
        image: "/assets/smile-concept/TD_bleaching_ba3.png",
        alt: "Lift deep stains safely for a naturally brilliant smile.",
        label: "Lift deep stains safely for a naturally brilliant smile.",
      },
    ],
  },
  "veneer-dan-crown": {
    slug: "veneer-dan-crown",
    title: "Veneer dan Crown",
    description: "Perawatan veneer dan crown untuk memperbaiki bentuk, warna, atau struktur gigi, dengan hasil yang dirancang agar terlihat natural dan harmonis dengan senyum pasien.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_veneer-dan-crown_hero.png",
    heroImageAlt: "Veneer dan Crown",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/TD_veneer-dan-crown_ba1.png",
        alt: "Restore and protect damaged teeth with a natural look.",
        label: "Restore and protect damaged teeth with a natural look.",
      },
      {
        image: "/assets/smile-concept/TD_veneer-dan-crown_ba2.png",
        alt: "Custom-made crown for a flawless, natural-looking tooth.",
        label: "Custom-made crown for a flawless, natural-looking tooth.",
      },
      {
        image: "/assets/smile-concept/TD_veneer-dan-crown_ba3.png",
        alt: "Strong, durable protection for a compromised tooth.",
        label: "Strong, durable protection for a compromised tooth.",
      },
    ],
  },
  "gingivectomy": {
    slug: "gingivectomy",
    title: "Gingivectomy",
    description: "Perawatan gusi estetik untuk membantu membentuk garis gusi agar terlihat lebih proporsional dan menciptakan tampilan senyum yang lebih seimbang.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_gingivectomy_hero.jpg",
    heroImageAlt: "Gingivectomy",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "gum-depigmentation": {
    slug: "gum-depigmentation",
    title: "Gum Depigmentation",
    description: "Perawatan untuk membantu mencerahkan tampilan gusi yang gelap atau tidak merata, sehingga area senyum terlihat lebih cerah dan estetik.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_gum-depigmentation_hero.jpg",
    heroImageAlt: "Gum Depigmentation",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "smile-makeover": {
    slug: "smile-makeover",
    title: "Smile Makeover",
    description: "Kombinasi beberapa perawatan estetik yang dirancang secara personal untuk membantu menciptakan senyum yang lebih harmonis, natural, dan sesuai karakter wajah pasien.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_smile-makeover_hero.webp",
    heroImageAlt: "Smile Makeover",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/TD_smile-makeover_ba1.png",
        alt: "Smile makeover for your personalized smile.",
        label: "Smile makeover for your personalized smile.",
      },
    ],
  },
  "full-mouth-rehabilitation": {
    slug: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    description: "Perawatan menyeluruh untuk membantu memperbaiki fungsi gigitan, kenyamanan saat mengunyah, dan kondisi gigi secara keseluruhan melalui treatment plan yang disesuaikan dengan kebutuhan pasien.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_full-mouth-rehabilitation_hero.webp",
    heroImageAlt: "Full Mouth Rehabilitation",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "removable-denture": {
    slug: "removable-denture",
    title: "Removable Denture",
    description: "Gigi tiruan lepasan untuk membantu menggantikan gigi yang hilang agar fungsi mengunyah, berbicara, dan penampilan tetap nyaman digunakan sehari-hari.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_removable-denture_hero.webp",
    heroImageAlt: "Removable Denture",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "dental-implant": {
    slug: "dental-implant",
    title: "Dental Implant",
    description: "Perawatan implan gigi untuk menggantikan gigi yang hilang dengan tampilan dan fungsi yang dirancang menyerupai gigi asli, sehingga terasa lebih stabil dan natural.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_dental-implant_hero.webp",
    heroImageAlt: "Dental Implant",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "fixed-denture": {
    slug: "fixed-denture",
    title: "Fixed Denture",
    description: "Gigi tiruan cekat yang dipasang secara permanen untuk membantu mengembalikan fungsi dan estetika senyum dengan hasil yang lebih nyaman dan praktis digunakan.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_fixed-denture_hero.jpg",
    heroImageAlt: "Fixed Denture",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "aesthetic-filling": {
    slug: "aesthetic-filling",
    title: "Aesthetic Filling",
    description: "Penambalan gigi estetik dengan warna yang disesuaikan menyerupai gigi asli, membantu memperbaiki tampilan dan fungsi gigi secara natural.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_aesthetic-filling_hero.webp",
    heroImageAlt: "Aesthetic Filling",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/TD_aesthetic-filling_ba1.png",
        alt: "Front Tooth Aesthetic Filling",
        label: "Front Tooth Aesthetic Filling",
      },
      {
        image: "/assets/smile-concept/TD_aesthetic-filling_ba2.png",
        alt: "Natural Front Tooth Restoration",
        label: "Natural Front Tooth Restoration",
      },
      {
        image: "/assets/smile-concept/TD_aesthetic-filling_ba3.png",
        alt: "Posterior Aesthetic Restoration",
        label: "Posterior Aesthetic Restoration",
      },
    ],
  },
  "root-canal-treatment": {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    description: "Perawatan saluran akar untuk mengatasi infeksi atau nyeri pada bagian dalam gigi, sekaligus mempertahankan gigi agar tetap dapat digunakan dengan nyaman.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_root-canal-treatment_hero.webp",
    heroImageAlt: "Root Canal Treatment",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "tooth-extraction": {
    slug: "tooth-extraction",
    title: "Tooth Extraction",
    description: "Tindakan pencabutan gigi yang dilakukan dengan pendekatan yang nyaman dan terencana, sesuai dengan kondisi dan kebutuhan setiap pasien.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_tooth-extraction_hero.webp",
    heroImageAlt: "Tooth Extraction",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "odontectomy": {
    slug: "odontectomy",
    title: "Odontectomy",
    description: "Tindakan operasi pencabutan gigi geraham bungsu untuk membantu mengatasi posisi gigi yang tumbuh miring, sulit tumbuh, atau menimbulkan rasa tidak nyaman.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_odontectomy_hero.jpg",
    heroImageAlt: "Odontectomy",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "temporomandibular-joint-disorder-treatment": {
    slug: "temporomandibular-joint-disorder-treatment",
    title: "Temporomandibular Joint Disorder Treatment",
    description: "Perawatan untuk membantu mengurangi keluhan pada sendi rahang seperti nyeri, bunyi klik, rahang terasa tegang, atau tidak nyaman saat mengunyah dan membuka mulut.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_temporomandibular-joint-disorder-treatment_hero.webp",
    heroImageAlt: "Temporomandibular Joint Disorder Treatment",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "scaling-for-kids": {
    slug: "scaling-for-kids",
    title: "Scaling for Kids",
    description: "Pembersihan karang gigi anak dengan pendekatan yang lebih lembut dan nyaman, untuk membantu menjaga kesehatan gigi dan gusi sejak dini.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_scaling-for-kids_hero.webp",
    heroImageAlt: "Scaling for Kids",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "fluoride-treatment": {
    slug: "fluoride-treatment",
    title: "Fluoride Treatment",
    description: "Pengaplikasian fluoride untuk membantu memperkuat lapisan gigi anak dan mengurangi risiko terjadinya gigi berlubang.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_fluoride-treatment_hero.webp",
    heroImageAlt: "Fluoride Treatment",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "pit-and-fissure-sealant": {
    slug: "pit-and-fissure-sealant",
    title: "Pit and Fissure Sealant",
    description: "Perawatan pelindung pada permukaan gigi geraham anak untuk membantu mencegah penumpukan sisa makanan dan risiko gigi berlubang.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_pit-and-fissure-sealant_hero.jpeg",
    heroImageAlt: "Pit and Fissure Sealant",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "pulpotomy-pulpectomy": {
    slug: "pulpotomy-pulpectomy",
    title: "Pulpotomy & Pulpectomy",
    description: "Perawatan saluran akar anak untuk membantu mengatasi infeksi atau kerusakan pada gigi susu, sekaligus mempertahankan fungsi gigi selama masa pertumbuhan.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_pulpotomy-pulpectomy_hero.avif",
    heroImageAlt: "Pulpotomy & Pulpectomy",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "tooth-extraction-for-kids": {
    slug: "tooth-extraction-for-kids",
    title: "Tooth Extraction for Kids",
    description: "Tindakan pencabutan gigi anak yang dilakukan dengan pendekatan yang lebih nyaman dan menenangkan sesuai kebutuhan si kecil.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_tooth-extraction-for-kids_hero.avif",
    heroImageAlt: "Tooth Extraction for Kids",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
  "kids-braces": {
    slug: "kids-braces",
    title: "Kids Braces",
    description: "Perawatan kawat gigi anak untuk membantu mengarahkan pertumbuhan rahang dan susunan gigi sejak dini agar berkembang lebih optimal.",
    tags: [],
    heroImage: "/assets/smile-concept/TD_kids-braces_hero.jpg",
    heroImageAlt: "Kids Braces",
    ctaLabel: "Jadwalkan konsultasi",
    results: [],
  },
};

export const getTreatmentDetail = (slug: string): TreatmentDetail | undefined =>
  treatmentDetails[slug];
