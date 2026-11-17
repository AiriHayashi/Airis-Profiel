
import Image from "next/image";
import Link from "next/link";
import getData from "@/lib/blog";
export const instant = false;

export default async function Home() {
  const [blogPosts, projectPosts] = await Promise.all([
    getData("article"),
    getData("product"),
  ]);

  const articles = Array.isArray(blogPosts?.data)
    ? blogPosts.data.slice(0, 4)
    : [];

  const projects = Array.isArray(projectPosts?.data)
    ? projectPosts.data.slice(0, 4)
    : [];

  return (
  <main className="w-full lg:w-1/2 max-w-none mx-auto text-neutral-900">

      {/* =========================
          Main Visual
      ========================= */}
      <section className="flex flex-col justify-center min-h-screen w-full mx-auto px-6 md:px-10 py-20">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 mb-14">

          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-serif tracking-wide leading-[1.3] mb-5 underline decoration-[1.5px] underline-offset-4">
              Let's build the future
              <br />
              with a big vision.
            </h1>

            <p className="text-xs md:text-sm text-neutral-500 italic font-serif tracking-wide leading-relaxed">
              If we have a big vision, we can get a power for success.
            </p>
          </div>

          <Link
            href="/about"
            className="bg-black text-white text-sm min-w-[120px] text-center py-3 px-6 hover:bg-neutral-700 transition-colors"
          >
            About
          </Link>

        </div>

        {/* Three-tone Image */}
        <div className="relative w-full aspect-[3/2] overflow-hidden">

          <div className="absolute inset-x-0 top-0 h-1/3 overflow-hidden">
            <Image
              src="/home/1.jpeg"
              alt="Visionary Future"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-center saturate-[85%] hue-rotate-[240deg] brightness-[0.95]"
            />
          </div>

          <div className="absolute inset-x-0 top-1/3 h-1/3 overflow-hidden">
            <Image
              src="/home/2.jpeg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-center grayscale contrast-[110%]"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1/3 overflow-hidden">
            <Image
              src="/home/3.jpeg"
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-center sepia saturate-[85%]"
            />
          </div>

        </div>

        <div className="w-full mt-5 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Vision / 2026
          </span>

          <span className="text-[10px] tracking-widest text-neutral-400">
            No. 001
          </span>
        </div>

      </section>


      {/* =========================
          Blog Section
      ========================= */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-20">

        <div className="flex justify-between items-end mb-12">

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
              Journal / Thoughts
            </p>

            <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
              Blog
            </h2>
          </div>

          <Link
            href="/blog"
            className="text-xs tracking-widest border-b border-neutral-400 pb-2 hover:opacity-50 transition-opacity"
          >
            VIEW ALL →
          </Link>

        </div>


        {articles.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">

            {articles.map((article) => {
              const content = article.data;

              if (!content) return null;

              const tags = Array.isArray(content.tag)
                ? content.tag
                : content.tag
                  ? [content.tag]
                  : [];

              return (
                <Link
                  href={`/blog/${content.slug}`}
                  key={article.id}
                  className="group"
                >

                  <div className="relative w-full aspect-[16/10] overflow-hidden mb-5 bg-neutral-100">

                    {content.cover ? (
                      <Image
                        src={content.cover}
                        alt={content.title || "Blog article"}
                        fill
                        sizes="(max-width: 768px) 100vw, 450px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs tracking-widest text-neutral-400">
                          NO IMAGE
                        </span>
                      </div>
                    )}

                  </div>

                  <div className="flex gap-3 items-center mb-3 flex-wrap">

                    {content.day && (
                      <span className="text-[10px] tracking-widest text-neutral-400">
                        {content.day}
                      </span>
                    )}

                    {tags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="text-[10px] tracking-widest text-neutral-400"
                      >
                        / {String(tag).toUpperCase()}
                      </span>
                    ))}

                  </div>

                  <h3 className="text-xl font-serif tracking-wide mb-2 group-hover:opacity-60 transition-opacity">
                    {content.title}
                  </h3>

                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {content.summary}
                  </p>

                </Link>
              );
            })}

          </div>

        ) : (
          <div className="py-20 border-y border-neutral-200 text-center">
            <p className="text-sm font-serif text-neutral-400">
              No articles available.
            </p>
          </div>
        )}


        <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
          <Link
            href="/blog"
            className="text-xs tracking-[0.25em] hover:opacity-50 transition-opacity"
          >
            EXPLORE ALL ARTICLES →
          </Link>
        </div>

      </section>


      {/* =========================
          Project Section
      ========================= */}
      
{/* =========================
    Project Section
========================= */}

<section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-24">

  {/* Heading */}
  <div className="flex justify-between items-end mb-12">
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
        Creation / Works
      </p>

      <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
        Project
      </h2>
    </div>

    <Link
      href="/project"
      className="text-xs tracking-widest border-b border-neutral-400 pb-2 hover:opacity-50 transition-opacity"
    >
      VIEW ALL →
    </Link>
  </div>

  {/* Project Grid */}
  {projects.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">

      {projects.map((project) => {
        const content = project.data;

        if (!content) return null;

        // Aboutから説明文を取得
        const description = Array.isArray(content.about)
          ? content.about
              .filter((item) => item.type === "paragraph")
              .map((item) => item.text)
              .filter(Boolean)
              .join(" ")
          : "";

        return (
          <Link
            href={`/project/${content.slug}`}
            key={project.id}
            className="group"
          >

            {/* Project Cover */}
            <div className="relative w-full aspect-[16/10] overflow-hidden mb-5 bg-neutral-100">

              {content.icon ? (
                <Image
                  src={content.icon}
                  alt={content.product_name || "Project"}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs tracking-widest text-neutral-400">
                    NO IMAGE
                  </span>
                </div>
              )}

            </div>

            {/* Project Information */}
            <div className="flex justify-between items-center mb-3 gap-4">
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] tracking-widest text-neutral-400">
                  PROJECT
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-3 group-hover:opacity-60 transition-opacity">
              {content.product_name || project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
              {description}
            </p>

            <div className="mt-5 text-[10px] tracking-[0.2em] text-neutral-400 group-hover:text-neutral-900 transition-colors">
              EXPLORE PROJECT →
            </div>

          </Link>
        );
      })}

    </div>
  ) : (
    <div className="py-20 border-y border-neutral-200 text-center">
      <p className="text-sm font-serif text-neutral-400">
        No projects available.
      </p>
    </div>
  )}

  {/* Bottom Link */}
  <div className="mt-16 pt-8 border-t border-neutral-200 text-center">
    <Link
      href="/project"
      className="text-xs tracking-[0.25em] hover:opacity-50 transition-opacity"
    >
      EXPLORE ALL PROJECTS →
    </Link>
  </div>

</section>
    </main>
  );
}
