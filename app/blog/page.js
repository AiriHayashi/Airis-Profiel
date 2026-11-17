
import Image from "next/image";
import Link from "next/link";
import getData from "@/lib/blog";
export const instant = false;
// 検索用文字列の正規化
function normalize(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .trim();
}

// 配列に統一
function toArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  return [value];
}

// ページネーションURL
function createPageUrl(page, keyword, tags) {
  const params = new URLSearchParams();

  if (keyword) {
    params.set("q", keyword);
  }

  tags.forEach((tag) => {
    params.append("tag", tag);
  });

  params.set("page", String(page));

  return `/blog?${params.toString()}`;
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;

  const keyword = String(params?.q || "");

  const selectedTags = [
    ...new Set(toArray(params?.tag).map(String)),
  ];

  const currentPage = Math.max(
    1,
    Number(params?.page) || 1
  );

  // CMSから記事を取得
  const result = await getData("article");

  const articles = Array.isArray(result)
    ? result
    : result?.data || [];

  // タグ一覧
  const allTags = [
    ...new Set(
      articles.flatMap((article) =>
        toArray(article.data?.tag).map(String)
      )
    ),
  ].sort((a, b) => a.localeCompare(b));

  // キーワードを分割
  const searchWords = normalize(keyword)
    .split(/\s+/)
    .filter(Boolean);

  // 検索処理
  const filteredArticles = articles.filter((article) => {
    const content = article.data || {};

    const tags = toArray(content.tag).map(String);

    const searchableText = normalize(
      [
        content.title,
        content.summary,
        content.tag,
        content.day,
        content.slug,
      ].join(" ")
    );

    // キーワード検索
    const matchesKeyword = searchWords.every((word) =>
      searchableText.includes(word)
    );

    // タグ検索（OR条件）
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => tags.includes(tag));

    return matchesKeyword && matchesTags;
  });

  // ページネーション
  const articlesPerPage = 12;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / articlesPerPage)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedArticles = filteredArticles.slice(
    (safePage - 1) * articlesPerPage,
    safePage * articlesPerPage
  );

  return (
<main className="w-full lg:w-1/2 max-w-none mx-auto text-neutral-900 text-neutral-900">

      {/* Main Section */}
      <section className="w-full mx-auto px-8 py-16">

        {/* Search & Filter */}
        <section className="mb-16">

          <form action="/blog" method="GET">

            {/* Search */}
            <div className="flex items-center gap-4 border-b border-neutral-300 pb-3">

              <input
                type="search"
                name="q"
                defaultValue={keyword}
                placeholder="Search articles..."
                className="w-full bg-transparent py-2 text-sm font-serif tracking-wide outline-none placeholder:text-neutral-400"
              />

              <button
                type="submit"
                className="shrink-0 text-[10px] tracking-[0.2em] font-medium hover:opacity-50 transition-opacity"
              >
                SEARCH →
              </button>

            </div>

            {/* Filter */}
            <div className="mt-6">

              <details className="group">

                <summary className="flex w-fit cursor-pointer list-none items-center gap-3 border border-neutral-300 px-5 py-3 text-[10px] tracking-[0.2em] transition-colors hover:bg-neutral-900 hover:text-white">

                  <span>FILTER</span>

                  {selectedTags.length > 0 && (
                    <span className="text-neutral-400">
                      ({selectedTags.length})
                    </span>
                  )}

                  <span className="transition-transform duration-200 group-open:rotate-180">
                    ↓
                  </span>

                </summary>

                {/* Filter Panel */}
                <div className="mt-5 border border-neutral-200 p-6">

                  <div className="flex items-center justify-between mb-6">

                    <div>
                      <p className="text-sm font-serif tracking-wide">
                        Categories
                      </p>

                      <p className="mt-2 text-[10px] tracking-widest text-neutral-400">
                        SELECT MULTIPLE TAGS
                      </p>
                    </div>

                    <Link
                      href="/blog"
                      className="text-[10px] tracking-widest text-neutral-400 underline underline-offset-4 hover:text-black"
                    >
                      CLEAR
                    </Link>

                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">

                    {allTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);

                      return (
                        <label
                          key={tag}
                          className="cursor-pointer"
                        >

                          <input
                            type="checkbox"
                            name="tag"
                            value={tag}
                            defaultChecked={isSelected}
                            className="peer sr-only"
                          />

                          <span
                            className="
                              inline-flex items-center gap-2
                              border border-neutral-300
                              bg-white px-4 py-2.5
                              text-[10px] tracking-widest
                              text-neutral-500
                              transition-all duration-200

                              hover:border-neutral-900

                              peer-checked:border-neutral-900
                              peer-checked:bg-neutral-900
                              peer-checked:text-white

                              peer-focus-visible:outline
                              peer-focus-visible:outline-2
                              peer-focus-visible:outline-offset-2
                              peer-focus-visible:outline-neutral-500
                            "
                          >

                            <span className="hidden peer-checked:inline">
                              ✓
                            </span>

                            {tag.toUpperCase()}

                          </span>

                        </label>
                      );
                    })}

                    {allTags.length === 0 && (
                      <p className="text-xs text-neutral-400">
                        No categories available.
                      </p>
                    )}

                  </div>

                  {/* Selected Tags */}
                  {selectedTags.length > 0 && (
                    <div className="mt-7 border-t border-neutral-200 pt-5">

                      <p className="mb-3 text-[10px] tracking-widest text-neutral-400">
                        CURRENTLY SELECTED
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-neutral-100 px-3 py-2 text-[10px] tracking-widest"
                          >
                            {tag.toUpperCase()}
                          </span>
                        ))}

                      </div>

                    </div>
                  )}

                </div>

              </details>

            </div>

          </form>

          {/* Active Search Conditions */}
          {(keyword || selectedTags.length > 0) && (

            <div className="mt-8 flex flex-wrap items-center gap-3">

              <span className="text-[10px] tracking-widest text-neutral-400">
                SEARCH:
              </span>

              {keyword && (
                <span className="text-xs text-neutral-600">
                  {keyword}
                </span>
              )}

              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest text-neutral-500"
                >
                  / {tag.toUpperCase()}
                </span>
              ))}

              <Link
                href="/blog"
                className="ml-auto text-[10px] tracking-widest text-neutral-400 underline underline-offset-4 hover:text-black"
              >
                RESET
              </Link>

            </div>

          )}

        </section>

        {/* Article Heading */}
        <div className="flex justify-between items-end mb-8">

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
              Archive / Collection
            </p>

            <h2 className="text-2xl font-serif tracking-wide">
              All Articles
            </h2>
          </div>

          <p className="text-[10px] tracking-widest text-neutral-400">
            {filteredArticles.length} ARTICLES
          </p>

        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 mb-10" />

        {/* Blog Grid */}
        {paginatedArticles.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">

            {paginatedArticles.map((article) => {
              const content = article.data || {};
              const tags = toArray(content.tag);

              return (

                <Link
                  href={`/blog/${content.slug}`}
                  key={article.id || content.slug}
                  className="group"
                >

                  {/* Cover */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden mb-5 bg-neutral-100">

                    {content.cover && (
                      <Image
                        src={content.cover}
                        alt={content.title || "Blog image"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                  </div>

                  {/* Date & Tags */}
                  <div className="flex gap-3 items-center mb-3 flex-wrap">

                    <span className="text-[10px] tracking-widest text-neutral-400">
                      {content.day}
                    </span>

                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-widest text-neutral-400"
                      >
                        / {String(tag).toUpperCase()}
                      </span>
                    ))}

                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif tracking-wide mb-3 group-hover:opacity-60 transition-opacity">
                    {content.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {content.summary}
                  </p>

                </Link>

              );
            })}

          </div>

        ) : (

          <div className="py-24 text-center">

            <p className="text-2xl font-serif tracking-wide">
              No articles found.
            </p>

            <p className="mt-4 text-xs text-neutral-400">
              Try changing your search conditions.
            </p>

            <Link
              href="/blog"
              className="inline-block mt-8 text-[10px] tracking-widest border-b border-neutral-400 pb-2 hover:opacity-50"
            >
              RESET SEARCH →
            </Link>

          </div>

        )}

        {/* Pagination */}
        {totalPages > 1 && (

          <div className="mt-20 pt-8 border-t border-neutral-200 flex justify-center items-center gap-6">

            {safePage > 1 && (
              <Link
                href={createPageUrl(
                  safePage - 1,
                  keyword,
                  selectedTags
                )}
                className="text-[10px] tracking-widest text-neutral-500 hover:text-black"
              >
                ← PREV
              </Link>
            )}

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (

              <Link
                key={page}
                href={createPageUrl(
                  page,
                  keyword,
                  selectedTags
                )}
                className={`
                  text-xs transition-colors
                  ${
                    page === safePage
                      ? "text-black underline underline-offset-4"
                      : "text-neutral-400 hover:text-black"
                  }
                `}
              >
                {String(page).padStart(2, "0")}
              </Link>

            ))}

            {safePage < totalPages && (
              <Link
                href={createPageUrl(
                  safePage + 1,
                  keyword,
                  selectedTags
                )}
                className="text-[10px] tracking-widest text-neutral-500 hover:text-black"
              >
                NEXT →
              </Link>
            )}

          </div>

        )}

        {/* Bottom Link */}
        <div className="mt-20 pt-8 border-t border-neutral-200 text-center">

          <Link
            href="/"
            className="text-[10px] tracking-[0.25em] hover:opacity-50 transition-opacity"
          >
            ← BACK TO HOME
          </Link>

        </div>

      </section>

    </main>
  );
}
