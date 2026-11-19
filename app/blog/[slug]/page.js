
import Image from "next/image";
import Link from "next/link";
import getData from "@/lib/blog";
import { notFound } from "next/navigation";
import AdBlock from "@/app/components/AdBlock";

export const instant = false;
/**
 * 動画URLを判定して、埋め込み用の情報を返す
 */
function getVideoInfo(value) {
  if (!value || typeof value !== "string") return null;

  try {
    const url = new URL(value.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    const host = url.hostname.replace(/^www\./, "");

    // YouTube
    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be" ||
      host === "youtube-nocookie.com"
    ) {
      let videoId = "";

      if (host === "youtu.be") {
        videoId = url.pathname.split("/")[1];
      } else {
        videoId =
          url.searchParams.get("v") ||
          url.pathname.match(
            /^\/(?:embed|shorts|live)\/([^/?]+)/
          )?.[1];
      }

      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return {
          type: "embed",
          url: `https://www.youtube-nocookie.com/embed/${videoId}`,
        };
      }
    }

    // Vimeo
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const videoId = url.pathname.match(/\/(\d+)/)?.[1];

      if (videoId) {
        return {
          type: "embed",
          url: `https://player.vimeo.com/video/${videoId}`,
        };
      }
    }

    // 直接再生できる動画ファイル
    if (/\.(mp4|webm|ogg)$/i.test(url.pathname)) {
      return {
        type: "file",
        url: url.href,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * 動画プレイヤー
 */
function VideoPlayer({ url, caption }) {
  const video = getVideoInfo(url);

  if (!video) {
    return (
      <p className="my-8 text-sm text-neutral-500">
        動画を表示できません。
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline ml-2"
        >
          動画を開く
        </a>
      </p>
    );
  }

  return (
    <figure className="my-12">
      <div className="aspect-video w-full overflow-hidden bg-neutral-100">
        {video.type === "embed" ? (
          <iframe
            src={video.url}
            title={caption || "Article video"}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <video
            src={video.url}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {caption && (
        <figcaption className="text-[10px] text-neutral-400 text-center mt-4 tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * 記事ブロックの描画
 */
function RenderBlock({ block }) {
  switch (block.type) {
    case "paragraph": {
      const text = String(block.text || "").trim();
      const video = getVideoInfo(text);

      // 段落に動画URLだけが貼られている場合、自動で動画を表示
      if (video) {
        return (
          <VideoPlayer
            url={text}
            caption={block.caption}
          />
        );
      }

      return (
        <p className="text-sm leading-8 text-neutral-600 mb-7 whitespace-pre-wrap">
          {block.text}
        </p>
      );
    }

    case "heading": {
      const level = Math.min(6, Math.max(1, block.level || 2));
      const Tag = `h${level}`;

      return (
        <Tag className="font-serif text-2xl tracking-wide mt-14 mb-6 text-neutral-900">
          {block.text}
        </Tag>
      );
    }

    case "bulleted":
      return (
        <ul className="list-disc pl-6 mb-8 space-y-3 text-sm text-neutral-600">
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal pl-6 mb-8 space-y-3 text-sm text-neutral-600">
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );

    case "todo":
      return (
        <ul className="mb-8 space-y-3 text-sm text-neutral-600">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 items-center">
              <input
                type="checkbox"
                checked={item.checked}
                readOnly
              />
              <span className={item.checked ? "line-through" : ""}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="my-12 border-l border-neutral-400 pl-6 py-2 font-serif italic text-neutral-500 leading-8">
          {block.text}
        </blockquote>
      );

    case "code":
      return (
        <pre className="my-10 p-6 bg-neutral-100 text-sm overflow-x-auto leading-7">
          <code>{block.text}</code>
        </pre>
      );

    case "divider":
      return <hr className="my-12 border-neutral-200" />;

    case "image":
      return (
        <figure className="my-12">
          <img
            src={block.url}
            alt={block.caption || ""}
            className="w-full h-auto"
          />

          {block.caption && (
            <figcaption className="text-[10px] text-neutral-400 text-center mt-4 tracking-wide">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "video":
      return (
        <VideoPlayer
          url={block.url}
          caption={block.caption}
        />
      );

    case "table":
      return (
        <div className="overflow-x-auto my-10">
          <table className="w-full text-sm text-left border-collapse">
            <tbody>
              {block.rows?.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-neutral-200 px-4 py-4 text-neutral-600"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
case "ad":
  return (
    <AdBlock
      ad={block.ad}
    />
  );

    default:
      return null;
  }
}

/**
 * 記事詳細ページ
 */
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const result = await getData("article");

  const article = result.data?.find(
    (item) => item.data.slug === slug
  );

  if (!article) {
    notFound();
  }

  const content = article.data;

  return (
    <main className="w-full lg:w-1/2 max-w-none mx-auto text-neutral-900">
      <section className="w-full mx-auto px-8 py-24">

        {/* Navigation */}
        <Link
          href="/blog"
          className="text-xs tracking-widest text-neutral-400 hover:text-neutral-900 transition"
        >
          ← BACK TO BLOG
        </Link>

        {/* Article Header */}
        <header className="mt-20 mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-5">
            Journal / Thoughts
          </p>

          <h1 className="text-4xl md:text-5xl font-serif tracking-wide leading-[1.3] mb-8">
            {content.title}
          </h1>

          <div className="flex gap-3 flex-wrap items-center">
            <span className="text-[10px] tracking-widest text-neutral-400">
              {content.day}
            </span>

            {content.tag?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-widest text-neutral-400"
              >
                / {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </header>

        {/* Cover */}
        {content.cover && (
          <div className="relative w-full aspect-[16/10] mb-16">
            <Image
              src={content.cover}
              alt={content.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Summary */}
        {content.summary && (
          <p className="font-serif italic text-neutral-500 text-base leading-8 mb-16">
            {content.summary}
          </p>
        )}

        {/* Body */}
        <article className="max-w-none">
          {content.body?.map((block, index) => (
            <RenderBlock
              key={block.id || index}
              block={block}
            />
          ))}
        </article>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-neutral-200">
          <Link
            href="/blog"
            className="text-xs tracking-[0.25em] hover:opacity-50 transition"
          >
            ← BACK TO ALL ARTICLES
          </Link>
        </footer>

      </section>
    </main>
  );
}
