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

type Card = {
  id: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
};

const CARDS: Card[] = [
  {
    id: "damon-braces",
    title: "Damon Braces",
    desc: "Gentle, innovative alignment without the hassle.",
    image: "/assets/smile-concept/0_Home_BA1.webp",
    alt: "Before and after Damon braces",
  },
  {
    id: "metal-braces",
    title: "Metal Braces",
    desc: "Align your teeth, elevate your confidence.",
    image: "/assets/smile-concept/0_Home_BA2.webp",
    alt: "Before and after metal braces",
  },
  {
    id: "dental-crown",
    title: "Dental Crown",
    desc: "Seamlessly restore the natural beauty of your smile.",
    image: "/assets/smile-concept/0_Home_BA3.webp",
    alt: "Before and after dental crown",
  },
  {
    id: "aesthetic-filling",
    title: "Aesthetic Filling",
    desc: "Seamless fillings that blend in perfectly.",
    image: "/assets/smile-concept/0_Home_BA4.webp",
    alt: "Before and after aesthetic filling",
  },
  {
    id: "bleaching",
    title: "Bleaching",
    desc: "Fast, professional whitening for a radiant, brighter smile.",
    image: "/assets/smile-concept/0_Home_BA5.webp",
    alt: "Before and after teeth bleaching",
  },
];

export default function Transformations() {
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
      id="transformations"
      aria-labelledby="transformations-title"
      className="bg-[#f3f3f1] pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]"
    >
      <Shell as="div">
        <h2 id="transformations-title" className="h2 text-ink mb-20 max-md:mb-8">
          Smile Transformations
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
          <CarouselContent className="ml-0 gap-5">
            {CARDS.map((card) => (
              <CarouselItem
                key={card.id}
                className="basis-full pl-0 md:basis-[calc((100%-20px)/2)] lg:basis-[calc((100%-46px)/3.3)]"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={774}
                  height={806}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 30vw"
                  className="block w-full aspect-[774/806] rounded-[20px] object-cover"
                />
                <h3 className="h4 text-ink mt-3.5">{card.title}</h3>
                <p className="caption text-ink mt-1.5">{card.desc}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-7 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2" aria-label="Transformations slides">
            {snapPoints.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                data-active={i === selected}
                aria-label={`Go to slide ${i + 1}`}
                className={[
                  "size-1.5 cursor-pointer rounded-full border-0 bg-ink/20 p-0",
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
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-full",
        "border border-ink/15 bg-white/65 text-ink",
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
