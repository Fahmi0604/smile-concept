"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "@/components/Shell";

type Treatment = {
  title: string;
  sub: string;
  image: string;
  alt: string;
  /** object-position from the prototype (framing tuned per photo). */
  position: string;
};

const TREATMENTS: Treatment[] = [
  {
    title: "For Your Perfect Smile Without Drama",
    sub: "Dental Spa, Braces, Invisalign, Bleaching, Veneer and Crown, Gingivectomy, Gum depigmentation, Smile Makeover",
    image: "/assets/smile-concept/0_Home_Treatment1.jpg",
    alt: "Patient with a bright, confident smile after aesthetic dental care",
    position: "78% 20%",
  },
  {
    title: "Restore Your Smile & Rise",
    sub: "Full mouth rehabilitation, Removable denture, Dental implant, Fixed denture",
    image: "/assets/smile-concept/0_Home_Treatment2.jpg",
    alt: "Couple sharing restored, healthy smiles",
    position: "55% 15%",
  },
  {
    title: "No More Pain All the Gain",
    sub: "Aesthetic filling, Root canal treatment, Tooth extraction, Odontectomy, Temporomandibular joint disorder treatment",
    image: "/assets/smile-concept/0_Home_Treatment3.jpg",
    alt: "Patient smiling comfortably after restorative dental treatment",
    position: "62% 20%",
  },
  {
    title: "Helping You Raise Confident Smile",
    sub: "Scaling for kids, Fluoride treatment, Pit and fissure sealant, Pulpotomy & Pulpectomy, Tooth extraction for kids, Kid’s braces",
    image: "/assets/smile-concept/0_Home_Treatment4.jpg",
    alt: "Parent and child sharing a confident smile after pediatric dental care",
    position: "50% 20%",
  },
];

const ROTATE_MS = 4000;

export default function Treatments() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [resetTick, setResetTick] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActive((cur) => (cur + 1) % TREATMENTS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused, resetTick]);

  const handleSelect = (i: number) => {
    setActive(i);
    setResetTick((k) => k + 1);
  };

  return (
    <section
      id="services"
      aria-labelledby="treatments-title"
      className="bg-white pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]"
    >
      <Shell as="div">
        <h2 id="treatments-title" className="h2 text-ink mb-20 max-md:mb-8">
          Personalized Treatments
        </h2>

        <div className="flex items-start gap-14 max-md:flex-col max-md:gap-8">
          <div aria-live="polite" className="w-[42%] shrink-0 max-md:w-full">
            <div className="relative overflow-hidden rounded-[20px] bg-surface aspect-[3/4] max-md:aspect-square">
              {TREATMENTS.map((t, i) => (
                <Image
                  key={t.image}
                  src={t.image}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 42vw"
                  priority={i === 0}
                  style={{ objectPosition: t.position }}
                  className={[
                    "absolute inset-0 rounded-[20px] object-cover transition-opacity duration-500",
                    i === active ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          <div
            onMouseLeave={() => setIsPaused(false)}
            className="flex flex-1 flex-col items-start gap-16 pt-2 max-md:w-full"
          >
            <ul role="list" className="m-0 flex w-full list-none flex-col gap-4 p-0">
              {TREATMENTS.map((t, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={t.title}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => handleSelect(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(i);
                      }
                    }}
                    onMouseEnter={() => {
                      setIsPaused(true);
                      setActive(i);
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    className={[
                      "flex cursor-pointer flex-col gap-1.5 rounded-3xl px-6 py-5",
                      "transition-colors duration-200 hover:bg-emphasize",
                      isActive ? "bg-emphasize" : "",
                    ].join(" ")}
                  >
                    <strong className="h4 text-ink font-medium">{t.title}</strong>
                    <span className="font-body text-[16px] leading-[1.5] text-ink/75">
                      {t.sub}
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/treatments"
              className="btn-outline button-large max-md:w-full max-md:justify-center"
            >
              Explore treatments
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function ArrowRightIcon() {
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
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
