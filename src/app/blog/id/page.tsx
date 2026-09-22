import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsId } from "@/lib/api";
import { metaData } from "@/lib/utils/metadata";
import { Shell } from "@/components/Shell";
import { BlogCard } from "@/components/BlogCard";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return metaData({
    title: "Blog — Smile Concept Dental Clinic",
    description:
      "Tips dan wawasan kesehatan gigi dari tim Smile Concept.",
    images: [{ url: "/assets/smile-concept/Braces.webp" }],
    path: "/blog/id",
  });
}

export default async function BlogIdPage() {
  const res = await getPostsId();
  if (!res) return notFound();
  const posts = res.data;

  return (
    <>
      <section className="bg-surface pt-40 pb-16 max-md:pt-30 max-md:pb-12">
        <Shell as="div">
          <h1 className="h2 text-ink">Blog</h1>
        </Shell>
      </section>

      <section aria-label="Artikel blog" className="bg-white pt-[72px] pb-24 max-md:pt-12 max-md:pb-16">
        <Shell as="div">
          {posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-5">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="body-text text-ink/60">Belum ada artikel. Nantikan tulisan berikutnya.</p>
          )}
        </Shell>
      </section>
    </>
  );
}
