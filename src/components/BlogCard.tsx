import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

function formatDate(value: string | null): string {
  if (!value) return "";
  try {
    return format(new Date(value), "d MMM yyyy");
  } catch {
    return "";
  }
}

const PLACEHOLDER = "/assets/smile-concept/Placeholder.png";

export function BlogCard({ post }: { post: Post }) {
  const date = formatDate(post.published_at);
  const thumbnail = post.thumbnail?.url || PLACEHOLDER;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-white transition-[border-color,box-shadow] duration-200 hover:border-ink/25 hover:[box-shadow:0_4px_20px_rgba(21,56,79,0.08)]">
      <div className="shrink-0 overflow-hidden">
        <Image
          src={thumbnail}
          alt={post.thumbnail?.alt || post.title}
          width={640}
          height={360}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="block aspect-video w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-7">
        {date && (
          <div className="flex items-center gap-3">
            <span className="font-body text-[14px] text-ink/50">{date}</span>
          </div>
        )}
        <h2 className="m-0 font-subhead text-[22px] font-medium leading-[1.35] text-ink">
          {post.title}
        </h2>
        <p className="m-0 flex-1 font-body text-[16px] leading-[1.6] text-ink/65">
          {post.description}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-1 inline-flex items-center gap-1.5 font-subhead text-[16px] font-medium text-ink no-underline transition-[gap] duration-200 hover:gap-2.5 after:absolute after:inset-0 after:content-['']"
        >
          Read more
          <svg
            width="16"
            height="16"
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
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;
