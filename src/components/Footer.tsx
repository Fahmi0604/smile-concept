import Image from "next/image";
import Link from "next/link";
import { Shell } from "./Shell";

const FOOTER_NAV = [
  { label: "Our Dentists", href: "/doctors" },
  { label: "Treatments", href: "/treatments" },
  { label: "Promo", href: "/promo" },
  { label: "Blog", href: "/blog" },
];

const DEFAULT_PHONE = "+62 81 1157 7137";
const DEFAULT_MAP_URL = "https://maps.app.goo.gl/QByFmotR9vqug6gJ8";
/** Used when the CMS `address` is empty. Mirrors the prototype's footer. */
const DEFAULT_ADDRESS_LINES = [
  "Jl. Benda Raya No.5",
  "Cilandak Timur, Pasar Minggu",
  "Jakarta Selatan, 12560",
];
const DEFAULT_INSTAGRAM = "https://www.instagram.com/smileconceptclinic/";
// Brief menandai Email dan YouTube dengan "-", artinya keduanya dihapus dari footer.
// Keduanya tetap dirender bila CMS mengisinya, jadi tidak ada fallback di sini.

/**
 * The CMS stores socials as either a full URL or a bare handle, so normalise to
 * an absolute URL before rendering.
 */
function socialUrl(value: string | null | undefined, base: string, fallback: string) {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  return base + value.replace(/^@/, "");
}

export default async function Footer({ settings }: { settings: Setting }) {
  const phone = settings?.phone || DEFAULT_PHONE;
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const email = settings?.email;
  const mapUrl = settings?.maps || DEFAULT_MAP_URL;
  const addressLines = [settings?.address?.street, settings?.address?.city].filter(
    (line): line is string => Boolean(line),
  );
  const lines = addressLines.length > 0 ? addressLines : DEFAULT_ADDRESS_LINES;
  const instagramUrl = socialUrl(
    settings?.social_media?.instagram,
    "https://www.instagram.com/",
    DEFAULT_INSTAGRAM,
  );
  const youtubeUrl = settings?.social_media?.youtube
    ? socialUrl(settings.social_media.youtube, "https://www.youtube.com/@", "")
    : null;

  return (
    <footer role="contentinfo" className="bg-ink pt-16 pb-10 text-white">
      <Shell as="div" className="flex flex-col">
        <div className="mb-12">
          <Image
            src="/assets/smile-concept/Logo3.webp"
            alt="Smile Concept Dental Clinic"
            width={224}
            height={56}
            className="block h-14 w-auto"
          />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-10 md:mb-16 md:grid-cols-3">
          <div>
            <h3 className="m-0 mb-4 font-subhead text-[18px] font-semibold leading-[1.3] text-white">
              Address
            </h3>
            <address className="m-0 mb-3 font-body text-[16px] not-italic leading-[1.6] text-white/75">
              {lines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </address>
            <Link
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[16px] text-white/75 underline underline-offset-[3px] transition-colors duration-150 hover:text-white"
            >
              See in Google Maps
            </Link>
          </div>

          <div>
            <h3 className="m-0 mb-4 font-subhead text-[18px] font-semibold leading-[1.3] text-white">
              Reach us
            </h3>
            <Link
              href={phoneHref}
              className="mb-1 block font-body text-[16px] leading-[1.6] text-white/75 no-underline transition-colors duration-150 hover:text-white"
            >
              {phone}
            </Link>
            {email && (
              <Link
                href={`mailto:${email}`}
                className="mb-1 block font-body text-[16px] leading-[1.6] text-white/75 no-underline transition-colors duration-150 hover:text-white"
              >
                {email}
              </Link>
            )}
            <div className="mt-5 flex items-center gap-4">
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex text-white/75 transition-colors duration-150 hover:text-white"
              >
                <InstagramIcon />
              </Link>
              {youtubeUrl && (
                <Link
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex text-white/75 transition-colors duration-150 hover:text-white"
                >
                  <YouTubeIcon />
                </Link>
              )}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-3">
            {FOOTER_NAV.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-[16px] leading-[1.5] text-white/75 no-underline transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <hr aria-hidden="true" className="m-0 mb-7 border-0 border-t border-white/20" />
        <p className="m-0 text-center font-body text-[14px] text-white/50">
          © {new Date().getFullYear()} Smile Concept
        </p>
      </Shell>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </svg>
  );
}
