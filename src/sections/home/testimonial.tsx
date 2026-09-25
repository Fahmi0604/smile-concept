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
          <div className="relative shrink-0 basis-[45%] max-md:basis-auto max-md:aspect-square">
            <Image
              src="/assets/smile-concept/0_Home_Testimonial.webp"
              alt="Matahari Palinggi, a happy patient"
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              className="block object-cover object-[center_top] max-md:rounded-t-[20px]"
            />
          </div>

          <div
            className={[
              "flex flex-1 flex-col justify-center gap-8",
              "px-[60px] py-[56px]",
              "max-md:px-6 max-md:py-8 max-md:gap-6",
            ].join(" ")}
          >
            <p className="body-text text-ink m-0">
              I decided to get braces here with Dr. Benazir, Sp. Ortho.{" "}
              <b>
                The doctor is very communicative, explained my dental issues
                clearly, how to treat them, and which type of braces would suit
                me best.
              </b>{" "}
              The front desk staff and nurses are also very friendly and respond
              quickly via WhatsApp, so I never feel confused or worried about
              missing information. I&rsquo;m still in the initial stage (dental
              impressions), but everything has been running smoothly. They also
              use a Godox camera, which helps both the doctor and patients
              monitor the progress of the braces. Highly recommended! 😍💗
            </p>
            {/* Brief tidak memberi job title untuk testimonial ini, jadi barisnya dihilangkan. */}
            <div className="flex flex-col gap-1">
              <strong className="h4 text-ink">Matahari Palinggi</strong>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
