import Image from "next/image";
import Link from "next/link";
import { Shell } from "@/components/Shell";

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: "Highly Skilled Professionals",
    description:
      "Tim dokter gigi berpengalaman dan berkompeten untuk menghadirkan perawatan yang tepat dan terpercaya.",
  },
  {
    title: "Thoughtful & Personalized Care",
    description:
      "Setiap perawatan dirancang secara personal sesuai kebutuhan, kenyamanan, dan lifestyle-mu.",
  },
  {
    title: "Honest Recommendations",
    description:
      "Rekomendasi perawatan yang transparan dan disesuaikan dengan kebutuhanmu.",
  },
];

export default function Doctors() {
  return (
    <section
      id="doctors"
      aria-labelledby="doctors-title"
      className="bg-surface pt-20 pb-[100px] max-md:pt-14 max-md:pb-[72px]"
    >
      <Shell as="div" className="flex flex-col">
        <div className="flex items-center justify-between gap-6 mb-20 max-md:mb-8 max-md:flex-wrap">
          <h2 id="doctors-title" className="h2 text-ink">
            Our Dentists
          </h2>
          <Link
            href="/doctors"
            className="btn-outline button-large max-md:hidden"
          >
            Meet all dentists
            <ArrowRightIcon />
          </Link>
        </div>

        <div className="order-3 md:order-2 grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-7">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <h3 className="h4 text-ink mb-2">{feature.title}</h3>
              <p className="caption text-ink">{feature.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/doctors"
          className="btn-outline button-large order-4 mt-8 justify-center md:hidden"
        >
          Meet all dentists
          <ArrowRightIcon />
        </Link>

        <div className="order-2 md:order-3 relative">
          <Image
            src="/assets/smile-concept/Doctors.png"
            alt="The Smile Concept team of doctors"
            width={1440}
            height={720}
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="block w-full h-auto rounded-[20px]"
          />
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
