"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Shell } from "@/components/Shell";

type Slide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** object-position tweak from the prototype (framing per photo). */
  position?: string;
};

const SLIDES: Slide[] = [
  {
    id: "facility-1",
    src: "/assets/smile-concept/0_Home_facility1.webp",
    alt: "Air polishing and scaling unit",
    caption:
      "A painless scaling experience designed to keep your teeth clean and your treatment comfortable.",
    position: "center 22%",
  },
  {
    id: "facility-2",
    src: "/assets/smile-concept/0_Home_facility2.webp",
    alt: "Clinician documenting treatment with a DSLR camera",
    caption: "DSLR Camera for accurate documentation and treatment planning.",
    position: "center 42%",
  },
  {
    id: "facility-3",
    src: "/assets/smile-concept/0_Home_facility3.webp",
    alt: "Smile Concept reception and waiting area",
    caption: "A welcoming space designed for comfort while you wait.",
  },
  {
    id: "facility-4",
    src: "/assets/smile-concept/0_Home_facility4.webp",
    alt: "Dentist using an intraoral camera during examination",
    caption:
      "An intraoral camera provides a closer look at your oral condition for a more precise examination.",
  },
  {
    id: "facility-5",
    src: "/assets/smile-concept/0_Home_facility5.webp",
    alt: "Spacious treatment room with a dedicated dental unit",
    caption:
      "Spacious treatment rooms equipped with dedicated dental units for a more private and comfortable dental visit.",
  },
  {
    id: "facility-6",
    src: "/assets/smile-concept/0_Home_facility6.webp",
    alt: "Treatment room with dedicated dental units",
    caption:
      "Two dedicated dental units designed to provide a comfortable and efficient treatment experience.",
  },
];

export default function Facility() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSnapPoints(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return (
    <section
      id="facility"
      aria-labelledby="facility-title"
      className="pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]"
    >
      <Shell as="div">
        <h2 id="facility-title" className="h2 text-ink mb-20 max-md:mb-8">
          Modern equipment and facility
        </h2>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="ml-0 gap-3">
            {SLIDES.map((slide) => (
              <CarouselItem
                key={slide.id}
                className="basis-full pl-0 md:basis-[calc((100%-12px)/2)] lg:basis-[calc((100%-27.6px)/3.3)]"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 30vw"
                  style={slide.position ? { objectPosition: slide.position } : undefined}
                  className="block w-full aspect-[4/3] rounded-[14px] object-cover"
                />
                <p className="caption text-ink mt-5">{slide.caption}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2" aria-label="Facility slides">
            {snapPoints.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                data-active={i === selected}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "size-1.5 cursor-pointer rounded-full border-0 bg-ink/25 p-0",
                  "transition-[transform,background-color] duration-200",
                  "hover:bg-ink/40",
                  "data-[active=true]:bg-ink data-[active=true]:scale-[1.15]",
                ].join(" ")}
              />
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <ArrowButton
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              label="Previous slide"
            >
              <ChevronLeftIcon />
            </ArrowButton>
            <ArrowButton
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              label="Next slide"
            >
              <ChevronRightIcon />
            </ArrowButton>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ArrowButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "inline-flex size-7 cursor-pointer items-center justify-center rounded-full",
        "border border-ink/15 bg-white/60 text-ink",
        "transition-[background-color,border-color,opacity] duration-200",
        "hover:not-disabled:bg-emphasize/80 hover:not-disabled:border-ink/30",
        "disabled:cursor-default disabled:opacity-[0.45]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 5L7 10L12 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 5L13 10L8 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
