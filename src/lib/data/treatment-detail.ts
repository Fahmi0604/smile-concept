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

  "dental-spa": {
    slug: "dental-spa",
    title: "Dental Spa",
    description: "Pembersihan karang gigi dan noda dengan pendekatan yang lebih nyaman dan minim rasa ngilu, untuk membantu menjaga kesehatan gigi sekaligus membuat senyum terlihat lebih segar dan bersih.",
    tags: ["1 visit"],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Dental Spa",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Focused deep cleaning to protect your upper teeth and gums.",
        label: "Focused deep cleaning to protect your upper teeth and gums.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Focused deep cleaning to protect your lower teeth and gums.",
        label: "Focused deep cleaning to protect your lower teeth and gums.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
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
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Clear Aligner",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Clear Aligner before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Clear Aligner before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Clear Aligner before and after",
        label: "Before & After",
      },
    ],
  },
  "bleaching": {
    slug: "bleaching",
    title: "Bleaching",
    description: "Perawatan pemutihan gigi untuk membantu mengurangi tampilan gigi kusam atau menguning, sehingga senyum terlihat lebih cerah dan fresh secara natural.",
    tags: ["1 visit"],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Bleaching",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Effortlessly erase stains.",
        label: "Effortlessly erase stains.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Professional whitening for a radiant smile.",
        label: "Professional whitening for a radiant smile.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
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
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Veneer dan Crown",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Restore and protect damaged teeth with a natural look.",
        label: "Restore and protect damaged teeth with a natural look.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Custom-made crown for a flawless, natural-looking tooth.",
        label: "Custom-made crown for a flawless, natural-looking tooth.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
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
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Gingivectomy",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Gingivectomy before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Gingivectomy before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Gingivectomy before and after",
        label: "Before & After",
      },
    ],
  },
  "gum-depigmentation": {
    slug: "gum-depigmentation",
    title: "Gum Depigmentation",
    description: "Perawatan untuk membantu mencerahkan tampilan gusi yang gelap atau tidak merata, sehingga area senyum terlihat lebih cerah dan estetik.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Gum Depigmentation",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Gum Depigmentation before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Gum Depigmentation before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Gum Depigmentation before and after",
        label: "Before & After",
      },
    ],
  },
  "smile-makeover": {
    slug: "smile-makeover",
    title: "Smile Makeover",
    description: "Kombinasi beberapa perawatan estetik yang dirancang secara personal untuk membantu menciptakan senyum yang lebih harmonis, natural, dan sesuai karakter wajah pasien.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Smile Makeover",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Smile makeover for your personalized smile.",
        label: "Smile makeover for your personalized smile.",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Smile Makeover before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Smile Makeover before and after",
        label: "Before & After",
      },
    ],
  },
  "full-mouth-rehabilitation": {
    slug: "full-mouth-rehabilitation",
    title: "Full Mouth Rehabilitation",
    description: "Perawatan menyeluruh untuk membantu memperbaiki fungsi gigitan, kenyamanan saat mengunyah, dan kondisi gigi secara keseluruhan melalui treatment plan yang disesuaikan dengan kebutuhan pasien.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Full Mouth Rehabilitation",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Full Mouth Rehabilitation before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Full Mouth Rehabilitation before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Full Mouth Rehabilitation before and after",
        label: "Before & After",
      },
    ],
  },
  "removable-denture": {
    slug: "removable-denture",
    title: "Removable Denture",
    description: "Gigi tiruan lepasan untuk membantu menggantikan gigi yang hilang agar fungsi mengunyah, berbicara, dan penampilan tetap nyaman digunakan sehari-hari.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Removable Denture",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Removable Denture before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Removable Denture before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Removable Denture before and after",
        label: "Before & After",
      },
    ],
  },
  "dental-implant": {
    slug: "dental-implant",
    title: "Dental Implant",
    description: "Perawatan implan gigi untuk menggantikan gigi yang hilang dengan tampilan dan fungsi yang dirancang menyerupai gigi asli, sehingga terasa lebih stabil dan natural.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Dental Implant",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Dental Implant before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Dental Implant before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Dental Implant before and after",
        label: "Before & After",
      },
    ],
  },
  "fixed-denture": {
    slug: "fixed-denture",
    title: "Fixed Denture",
    description: "Gigi tiruan cekat yang dipasang secara permanen untuk membantu mengembalikan fungsi dan estetika senyum dengan hasil yang lebih nyaman dan praktis digunakan.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Fixed Denture",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Fixed Denture before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Fixed Denture before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Fixed Denture before and after",
        label: "Before & After",
      },
    ],
  },
  "aesthetic-filling": {
    slug: "aesthetic-filling",
    title: "Aesthetic Filling",
    description: "Penambalan gigi estetik dengan warna yang disesuaikan menyerupai gigi asli, membantu memperbaiki tampilan dan fungsi gigi secara natural.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Aesthetic Filling",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Front Tooth Aesthetic Filling",
        label: "Front Tooth Aesthetic Filling",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Natural Front Tooth Restoration",
        label: "Natural Front Tooth Restoration",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
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
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Root Canal Treatment",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Root Canal Treatment before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Root Canal Treatment before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Root Canal Treatment before and after",
        label: "Before & After",
      },
    ],
  },
  "tooth-extraction": {
    slug: "tooth-extraction",
    title: "Tooth Extraction",
    description: "Tindakan pencabutan gigi yang dilakukan dengan pendekatan yang nyaman dan terencana, sesuai dengan kondisi dan kebutuhan setiap pasien.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Tooth Extraction",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Tooth Extraction before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Tooth Extraction before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Tooth Extraction before and after",
        label: "Before & After",
      },
    ],
  },
  "odontectomy": {
    slug: "odontectomy",
    title: "Odontectomy",
    description: "Tindakan operasi pencabutan gigi geraham bungsu untuk membantu mengatasi posisi gigi yang tumbuh miring, sulit tumbuh, atau menimbulkan rasa tidak nyaman.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Odontectomy",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Odontectomy before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Odontectomy before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Odontectomy before and after",
        label: "Before & After",
      },
    ],
  },
  "temporomandibular-joint-disorder-treatment": {
    slug: "temporomandibular-joint-disorder-treatment",
    title: "Temporomandibular Joint Disorder Treatment",
    description: "Perawatan untuk membantu mengurangi keluhan pada sendi rahang seperti nyeri, bunyi klik, rahang terasa tegang, atau tidak nyaman saat mengunyah dan membuka mulut.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Temporomandibular Joint Disorder Treatment",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Temporomandibular Joint Disorder Treatment before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Temporomandibular Joint Disorder Treatment before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Temporomandibular Joint Disorder Treatment before and after",
        label: "Before & After",
      },
    ],
  },
  "scaling-for-kids": {
    slug: "scaling-for-kids",
    title: "Scaling for Kids",
    description: "Pembersihan karang gigi anak dengan pendekatan yang lebih lembut dan nyaman, untuk membantu menjaga kesehatan gigi dan gusi sejak dini.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Scaling for Kids",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Scaling for Kids before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Scaling for Kids before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Scaling for Kids before and after",
        label: "Before & After",
      },
    ],
  },
  "fluoride-treatment": {
    slug: "fluoride-treatment",
    title: "Fluoride Treatment",
    description: "Pengaplikasian fluoride untuk membantu memperkuat lapisan gigi anak dan mengurangi risiko terjadinya gigi berlubang.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Fluoride Treatment",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Fluoride Treatment before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Fluoride Treatment before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Fluoride Treatment before and after",
        label: "Before & After",
      },
    ],
  },
  "pit-and-fissure-sealant": {
    slug: "pit-and-fissure-sealant",
    title: "Pit and Fissure Sealant",
    description: "Perawatan pelindung pada permukaan gigi geraham anak untuk membantu mencegah penumpukan sisa makanan dan risiko gigi berlubang.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Pit and Fissure Sealant",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Pit and Fissure Sealant before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Pit and Fissure Sealant before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Pit and Fissure Sealant before and after",
        label: "Before & After",
      },
    ],
  },
  "pulpotomy-pulpectomy": {
    slug: "pulpotomy-pulpectomy",
    title: "Pulpotomy & Pulpectomy",
    description: "Perawatan saluran akar anak untuk membantu mengatasi infeksi atau kerusakan pada gigi susu, sekaligus mempertahankan fungsi gigi selama masa pertumbuhan.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Pulpotomy & Pulpectomy",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Pulpotomy & Pulpectomy before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Pulpotomy & Pulpectomy before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Pulpotomy & Pulpectomy before and after",
        label: "Before & After",
      },
    ],
  },
  "tooth-extraction-for-kids": {
    slug: "tooth-extraction-for-kids",
    title: "Tooth Extraction for Kids",
    description: "Tindakan pencabutan gigi anak yang dilakukan dengan pendekatan yang lebih nyaman dan menenangkan sesuai kebutuhan si kecil.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Tooth Extraction for Kids",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Tooth Extraction for Kids before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Tooth Extraction for Kids before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Tooth Extraction for Kids before and after",
        label: "Before & After",
      },
    ],
  },
  "kids-braces": {
    slug: "kids-braces",
    title: "Kids Braces",
    description: "Perawatan kawat gigi anak untuk membantu mengarahkan pertumbuhan rahang dan susunan gigi sejak dini agar berkembang lebih optimal.",
    tags: [],
    // TODO(assets): brief Final hero is an external reference URL, not a
    // licensed asset. Swap when the client delivers the real photo.
    heroImage: "/assets/smile-concept/Placeholder.png",
    heroImageAlt: "Kids Braces",
    ctaLabel: "Jadwalkan konsultasi",
    results: [
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Kids Braces before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Kids Braces before and after",
        label: "Before & After",
      },
      {
        image: "/assets/smile-concept/Placeholder.png",
        alt: "Kids Braces before and after",
        label: "Before & After",
      },
    ],
  },
};

export const getTreatmentDetail = (slug: string): TreatmentDetail | undefined =>
  treatmentDetails[slug];
