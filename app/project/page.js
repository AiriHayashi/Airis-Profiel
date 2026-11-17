
import Image from "next/image";
import Link from "next/link";
import getData from "@/lib/blog";
export const instant = false;

export default async function ProductPage() {
  const products = await getData("product");

  const productList = products.data?.filter(
    (product) => product.status === "published"
  ) || [];

  return (
<main className="w-full lg:w-1/2 max-w-none mx-auto text-neutral-900 text-neutral-900">

      <section className="w-full mx-auto px-8 py-16 text-neutral-900">

        {/* Heading */}
        <div className="mb-16">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Projects / Creations
          </p>

          <h1 className="text-4xl font-serif tracking-wide leading-[1.3] mb-5">
            Projects.
          </h1>

          <p className="text-sm text-neutral-500 italic font-serif tracking-wide leading-relaxed">
            Ideas into reality. Discover what we create.
          </p>

        </div>

        {/* Product List */}
        <div className="flex flex-col">

          {productList.map((product, index) => {
            const content = product.data;

            return (
              <Link
                key={product.id}
                href={`/project/${content.slug}`}
                className="group border-t border-neutral-200 py-10"
              >

                {/* Product Image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden mb-6 bg-neutral-100">

                  {content.icon && (
                    <Image
                      src={content.icon}
                      alt={content.product_name}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                </div>

                {/* Product Information */}
                <div className="flex justify-between items-start gap-6">

                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-3">

                      <span className="text-[10px] tracking-widest text-neutral-400">
                        NO. {String(index + 1).padStart(3, "0")}
                      </span>

                      <span className="text-[10px] tracking-widest text-neutral-400">
                        / PRODUCT
                      </span>

                    </div>

                    <h2 className="text-2xl font-serif tracking-wide mb-3 group-hover:opacity-60 transition-opacity">
                      {content.product_name}
                    </h2>

                    <div className="text-sm text-neutral-500 leading-relaxed">
                      {content.about?.slice(0, 1).map((block) => (
                        <p key={block.id} className="line-clamp-2">
                          {block.text}
                        </p>
                      ))}
                    </div>

                  </div>

                  <span className="text-xs tracking-widest text-neutral-400 mt-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>

                </div>

              </Link>
            );
          })}

        </div>

        {/* Empty State */}
        {productList.length === 0 && (
          <div className="border-t border-neutral-200 py-16 text-center">
            <p className="text-sm text-neutral-400 font-serif italic">
              No products available yet.
            </p>
          </div>
        )}

        {/* Bottom */}
        <div className="mt-10 pt-8 border-t border-neutral-200 text-center">

          <Link
            href="/"
            className="text-xs tracking-[0.25em] hover:opacity-50 transition-opacity"
          >
            BACK TO HOME →
          </Link>

        </div>

      </section>

    </main>
  );
}
