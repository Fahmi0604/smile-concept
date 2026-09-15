import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { getPostBySlug, getSettings } from "@/lib/api";
import { metaData } from "@/lib/utils/metadata";
import { stripInlineStyles } from "@/lib/utils/html";
import { Shell } from "@/components/Shell";
import JsonLd from "@/lib/components/JsonLd";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let blog;
  try {
    blog = await getPostBySlug(slug);
  } catch {
    return {};
  }
  if (!blog?.data) return {};

  const post = blog.data;
  return metaData({
    title: post.title,
    description: post.description,
    images: post.thumbnail?.url ? [{ url: post.thumbnail.url }] : [],
    path: `/blog/${post.slug}`,
    language: post.language,
  });
}

function formatDate(value: string | null, language: string): string {
  if (!value) return "";
  try {
    return format(new Date(value), "d MMMM yyyy", {
      locale: language?.startsWith("id") ? idLocale : undefined,
    });
  } catch {
    return "";
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let blog;
  try {
    blog = await getPostBySlug(slug);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NOT_FOUND") notFound();
    throw error;
  }
  if (!blog) notFound();

  const post = blog.data;
  const settings = await getSettings();
  const language = post.language ?? "id";
  const date = formatDate(post.published_at, language);
  const bookHref = post.cta?.url || settings.data?.link_whatsapp || "https://wa.me/";
  const ctaLabel = post.cta?.title || "Ready to start your smile journey?";
  const ctaSubtitle = post.cta?.subtitle;
  const ctaButton =
    post.cta?.button ||
    (language.startsWith("id") ? "Jadwalkan konsultasi" : "Book a consultation");

  return (
    <>
      <JsonLd schemaType="BlogPosting" data={post} />

      <section className="bg-surface pt-[148px] pb-14 max-md:pt-30 max-md:pb-10">
        <Shell as="div">
          {date && (
            <span className="mb-5 block font-body text-[15px] text-ink/55">{date}</span>
          )}
          <h1 className="h2 text-ink">{post.title}</h1>
        </Shell>
      </section>

      {post.thumbnail?.url && (
        <div className="relative h-[480px] w-full bg-white max-md:h-[280px]">
          <Image
            src={post.thumbnail.url}
            alt={post.thumbnail.alt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      )}

      <article className="bg-white pt-16 pb-24 max-md:pt-10 max-md:pb-16">
        <div className="mx-auto max-w-[720px] px-6">
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: stripInlineStyles(post.content) }}
          />

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-ink/12 pt-10">
            <p className="font-subhead text-[22px] font-medium text-ink">{ctaLabel}</p>
            {ctaSubtitle && (
              <p className="m-0 font-body text-[16px] leading-[1.6] text-ink/65">
                {ctaSubtitle}
              </p>
            )}
            <Link
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="article-consult"
              className="btn-primary button-large"
            >
              {ctaButton}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
