export const dynamic = "force-dynamic";

import { getSettings, getPromos } from "@/lib/api";
import { metaData } from "@/lib/utils/metadata";
import HomeHero from "@/sections/home/hero";
import StatsBar from "@/sections/home/stats-bar";
import Treatments from "@/sections/home/treatments";
import Doctors from "@/sections/home/doctors";
import Transformations from "@/sections/home/transformations";
import Promo from "@/sections/home/promo";
import Facility from "@/sections/home/facility";
import Testimonial from "@/sections/home/testimonial";
import CtaBlock from "@/sections/home/cta-block";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: 'Smile Concept — Personalized care for your better smile',
    description: "Trusted dental clinic in the heart of Kemang. Friendly, caring and personalized treatments — braces, clear aligners, veneers, whitening, and more.",
    images: [{ url: '/assets/smile-concept/hero-bg.png' }],
    path: '/',
  });
}

export default async function Home() {
  const [settings, promosRes] = await Promise.all([getSettings(), getPromos()])

  return (
    <>
      <HomeHero settings={settings.data} />
      <StatsBar settings={settings.data} />
      <Treatments />
      <Doctors />
      <Transformations />
      <Promo settings={settings.data} promos={promosRes.data} />
      <Facility />
      <Testimonial />
      <CtaBlock settings={settings.data} />
    </>
  );
}
