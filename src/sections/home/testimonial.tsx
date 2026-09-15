import Image from "next/image";
import { Shell } from "@/components/Shell";

export default function Testimonial() {
  return (
    <section
      aria-labelledby="testimonial-title"
      className="bg-white pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]"
    >
      <Shell as="div">
        <h2 id="testimonial-title" className="h2 text-ink mb-20 max-md:mb-8">
          What our patients say
        </h2>

        <div
          className={[
            "flex overflow-hidden rounded-[20px] bg-surface min-h-[420px]",
            "max-md:flex-col max-md:min-h-0",
          ].join(" ")}
        >
          <div className="relative shrink-0 basis-[45%] max-md:basis-auto max-md:aspect-[4/3]">
            <Image
              src="/assets/smile-concept/Testimony.png"
              alt="Nurfathia Yasmin, a Smile Concept patient"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              className="block object-cover object-top max-md:rounded-t-[20px]"
            />
            <div
              role="img"
              aria-label="5 out of 5 stars"
              className="absolute bottom-6 left-8 flex gap-1.5 max-md:bottom-4 max-md:left-5"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
          </div>

          <div
            className={[
              "flex flex-1 flex-col justify-center gap-8",
              "px-[60px] py-[56px]",
              "max-md:px-6 max-md:py-8 max-md:gap-6",
            ].join(" ")}
          >
            <p className="body-text text-ink m-0">
              I&rsquo;ve been coming here for a few years now, from braces
              treatment to regular dental care, and every experience has been
              comfortable and effective. My teeth alignment has improved so much
              over time. I really appreciate the doctor and staff for their
              friendliness and the clear information they always provide!
            </p>
            {/* Brief tidak memberi job title untuk testimonial ini, jadi barisnya dihilangkan. */}
            <div className="flex flex-col gap-1">
              <strong className="h4 text-ink">Nurfathia Yasmin</strong>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function StarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="#F5C518"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 1l2.39 5.26L18 7.27l-4 3.9.94 5.56L10 14l-4.94 2.73L6 11.17 2 7.27l5.61-.51L10 1z" />
    </svg>
  );
}
