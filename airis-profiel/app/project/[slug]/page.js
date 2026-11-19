import Image from "next/image";
import Link from "next/link";
import getData from "@/lib/blog";
import { notFound } from "next/navigation";

export const instant = false;

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  const result = await getData("product");
  const products = Array.isArray(result?.data) ? result.data : [];

  const product = products.find(
    (item) =>
      item.status === "published" &&
      item.data?.slug === slug
  );

  if (!product) {
    notFound();
  }

  const item = product.data;

  const about = Array.isArray(item.about)
    ? item.about
    : [];

  return (
    <main className="relative -translate-x-1/2 left-1/2 w-full lg:w-1/2 max-w-none mx-auto text-neutral-900 text-neutral-900">

      {/* =========================
          Main Visual
      ========================= */}

      <section className="flex flex-col justify-center min-h-[75vh] w-full mx-auto px-6 md:px-10 py-20">

        {/* Back Link */}
        <div className="mb-16">
          <Link
            href="/project"
            className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            ← All Projects
          </Link>
        </div>

        {/* Product Heading */}
        <div className="mb-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-5">
            Creation / Works
          </p>

          <h1 className="text-3xl md:text-5xl font-serif tracking-wide leading-[1.3]">
            {item.product_name}
          </h1>

        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-100">

          {item.icon ? (
            <Image
              src={item.icon}
              alt={item.product_name || "Product"}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs tracking-widest text-neutral-400">
                NO IMAGE
              </span>
            </div>
          )}

        </div>

        {/* Image Caption */}
        <div className="w-full mt-5 flex justify-between items-center">

          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Project / {item.product_name}
          </span>

          <span className="text-[10px] tracking-widest text-neutral-400">
            No. 001
          </span>

        </div>

      </section>


      {/* =========================
          About Section
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-20">

        {/* Heading */}
        <div className="mb-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
            Introduction / Overview
          </p>

          <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
            About
          </h2>

        </div>

        {/* Content */}
        {about.length > 0 ? (

          <div className="space-y-8">

            {about.map((block, index) => {

              if (block.type !== "paragraph") {
                return null;
              }

              return (
                <p
                  key={block.id || index}
                  className="text-sm md:text-base text-neutral-600 leading-8 tracking-wide"
                >
                  {block.text}
                </p>
              );

            })}

          </div>

        ) : (

          <div className="py-12 border-y border-neutral-200">
            <p className="text-sm font-serif text-neutral-400">
              No description available.
            </p>
          </div>

        )}

      </section>


      {/* =========================
          Visit Product
      ========================= */}

      {item.url && (

        <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-16">

          <div className="border-y border-neutral-200 py-12 text-center">

            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-5">
              Explore / External Link
            </p>

            <h2 className="text-3xl font-serif tracking-wide mb-8">
              Discover More
            </h2>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-black text-white text-xs tracking-widest px-8 py-4 hover:bg-neutral-700 transition-colors"
            >
              VISIT PRODUCT ↗
            </a>

          </div>

        </section>

      )}


      {/* =========================
          Bottom Navigation
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-16">

        <div className="border-t border-neutral-200 pt-10 flex justify-between items-center">

          <Link
            href="/project"
            className="text-xs tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ← ALL PROJECTS
          </Link>

          <span className="text-[10px] tracking-[0.25em] text-neutral-400">
            CREATION / WORKS
          </span>

        </div>

      </section>

    </main>
  );
}