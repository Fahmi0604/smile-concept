import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { metaData } from "@/lib/utils/metadata";
import { getSettings } from "@/lib/api";
import { Shell } from "@/components/Shell";
import CtaBlock from "@/sections/home/cta-block";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: "Treatments — Smile Concept Dental Clinic",
    description:
      "Smile Concept menghadirkan perawatan gigi menyeluruh dengan pendekatan yang personal, nyaman, dan dirancang sesuai kebutuhanmu.",
    images: [{ url: "/assets/smile-concept/ModelTreatment1.png" }],
    path: "/treatments",
  });
}

type TreatmentItem = {
  name: string;
  sub: string;
  /** Internal route; when absent the item links to WhatsApp. */
  href?: string;
};

type Category = {
  id: string;
  title: string;
  image: string;
  /** object-position for the category photo (prototype tunes framing per photo). */
  imagePosition?: string;
  imageRight?: boolean;
  items: TreatmentItem[];
};

const CATEGORIES: Category[] = [
  {
    id: "tx-cat-1",
    title: "For Your Perfect Smile Without Drama",
    image: "/assets/smile-concept/0_Home_Treatment1.jpg",
    imagePosition: "68% center",
    items: [
      {
        name: "Dental Spa",
        sub: "Pembersihan karang dan noda gigi minim rasa sakit",
        href: "/treatments/dental-spa",
      },
      { name: "Braces", sub: "Perawatan kawat gigi", href: "/treatments/braces" },
      { name: "Clear Aligner", sub: "Invisalign", href: "/treatments/clear-aligner" },
      { name: "Bleaching", sub: "Pemutihan gigi", href: "/treatments/bleaching" },
      {
        name: "Veneer dan Crown",
        sub: "Mahkota tiruan",
        href: "/treatments/veneer-dan-crown",
      },
      {
        name: "Gingivectomy",
        sub: "Perawatan gusi estetik",
        href: "/treatments/gingivectomy",
      },
      {
        name: "Gum depigmentation",
        sub: "Mencerahkan tampilan gusi",
        href: "/treatments/gum-depigmentation",
      },
      {
        name: "Smile Makeover",
        sub: "Kombinasi perawatan estetik untuk senyum yang lebih harmonis",
        href: "/treatments/smile-makeover",
      },
    ],
  },
  {
    id: "tx-cat-2",
    title: "Restore Your Smile & Rise",
    image: "/assets/smile-concept/0_Home_Treatment2.jpg",
    imageRight: true,
    items: [
      {
        name: "Full mouth rehabilitation",
        sub: "Perbaikan gigitan",
        href: "/treatments/full-mouth-rehabilitation",
      },
      {
        name: "Removable denture",
        sub: "Gigi tiruan lepasan",
        href: "/treatments/removable-denture",
      },
      {
        name: "Dental implant",
        sub: "Implan gigi",
        href: "/treatments/dental-implant",
      },
      {
        name: "Fixed denture",
        sub: "Gigi tiruan cekat",
        href: "/treatments/fixed-denture",
      },
    ],
  },
  {
    id: "tx-cat-3",
    title: "No More Pain All the Gain",
    image: "/assets/smile-concept/0_Home_Treatment3.jpg",
    imagePosition: "55% center",
    items: [
      {
        name: "Aesthetic filling",
        sub: "Penambalan gigi estetik",
        href: "/treatments/aesthetic-filling",
      },
      {
        name: "Root canal treatment",
        sub: "Perawatan saluran akar",
        href: "/treatments/root-canal-treatment",
      },
      {
        name: "Tooth extraction",
        sub: "Pencabutan gigi",
        href: "/treatments/tooth-extraction",
      },
      {
        name: "Odontectomy",
        sub: "Operasi gigi geraham bungsu",
        href: "/treatments/odontectomy",
      },
      {
        name: "Temporomandibular joint disorder treatment",
        sub: "Perawatan untuk sakit pada sendi rahang",
        href: "/treatments/temporomandibular-joint-disorder-treatment",
      },
    ],
  },
  {
    id: "tx-cat-4",
    title: "Helping Your Kids Raise Confident Smile",
    image: "/assets/smile-concept/0_Home_Treatment4.jpg",
    imageRight: true,
    items: [
      {
        name: "Scaling for kids",
        sub: "Pembersihan karang gigi anak",
        href: "/treatments/scaling-for-kids",
      },
      {
        name: "Fluoride treatment",
        sub: "Perawatan fluoride",
        href: "/treatments/fluoride-treatment",
      },
      {
        name: "Pit and fissure sealant",
        sub: "Perawatan untuk mencegah gigi berlubang",
        href: "/treatments/pit-and-fissure-sealant",
      },
      {
        name: "Pulpotomy & Pulpectomy",
        sub: "Perawatan saluran akar anak",
        href: "/treatments/pulpotomy-pulpectomy",
      },
      {
        name: "Tooth extraction for kids",
        sub: "Pencabutan gigi anak",
        href: "/treatments/tooth-extraction-for-kids",
      },
      {
        name: "Kids braces",
        sub: "Kawat gigi anak",
        href: "/treatments/kids-braces",
      },
    ],
  },
];

export default async function TreatmentsPage() {
  const settings = await getSettings();
  const bookHref = settings.data?.link_whatsapp || "https://wa.me/";

  return (
    <>
      <section className="bg-surface pt-40 pb-16 max-md:pt-30 max-md:pb-12">
        <Shell as="div">
          <h1 className="h2 text-ink mb-5">Our Treatments</h1>
          <p className="caption text-ink max-w-[640px]">
            Smile Concept menghadirkan perawatan gigi menyeluruh dengan pendekatan
            yang personal, nyaman, dan dirancang sesuai kebutuhanmu.
          </p>
        </Shell>
      </section>

      {CATEGORIES.map((category) => (
        <CategorySection key={category.id} category={category} bookHref={bookHref} />
      ))}

      <CtaBlock settings={settings.data} />
    </>
  );
}

function CategorySection({
  category,
  bookHref,
}: {
  category: Category;
  bookHref: string;
}) {
  const image = (
    <div className="overflow-hidden rounded-2xl bg-surface aspect-[3/4]">
      <Image
        src={category.image}
        alt={category.title}
        width={600}
        height={800}
        sizes="(max-width: 767px) 100vw, 33vw"
        style={category.imagePosition ? { objectPosition: category.imagePosition } : undefined}
        className="block h-full w-full object-cover object-top"
      />
    </div>
  );

  const items = (
    <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1 max-md:gap-2.5">
      {category.items.map((item) => (
        <Item key={item.name} item={item} bookHref={bookHref} />
      ))}
    </div>
  );

  return (
    <section
      aria-labelledby={category.id}
      className="bg-white pt-[72px] pb-20 max-md:pt-12 max-md:pb-14"
    >
      <Shell as="div">
        <h2 id={category.id} className="h3-subheadline text-ink mb-8">
          {category.title}
        </h2>
        <div
          className={[
            "grid items-start gap-8 max-md:grid-cols-1 max-md:gap-6",
            category.imageRight ? "grid-cols-[2fr_1fr]" : "grid-cols-[1fr_2fr]",
          ].join(" ")}
        >
          {category.imageRight ? (
            <>
              {items}
              <div className="max-md:order-2">{image}</div>
            </>
          ) : (
            <>
              {image}
              {items}
            </>
          )}
        </div>
      </Shell>
    </section>
  );
}

function Item({ item, bookHref }: { item: TreatmentItem; bookHref: string }) {
  const isInternal = Boolean(item.href);
  const href = item.href ?? bookHref;

  return (
    <Link
      href={href}
      {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={[
        "group flex items-center justify-between gap-3 rounded-xl px-5 py-4",
        "border border-ink/12 bg-white text-ink no-underline",
        "transition-[border-color,background-color,transform] duration-200",
        "hover:-translate-y-px hover:border-ink hover:bg-emphasize",
      ].join(" ")}
    >
      <span className="flex min-w-0 flex-col gap-[3px]">
        <strong className="font-subhead text-[24px] font-medium leading-[1.3] text-ink">
          {item.name}
        </strong>
        <span className="font-body text-[18px] leading-[1.4] tracking-[0.02em] text-ink/60">
          {item.sub}
        </span>
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 text-ink opacity-50 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        <path
          d="M4 10H16M16 10L11 5M16 10L11 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
