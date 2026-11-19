

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-6 py-20 text-neutral-900">

      <section className="w-full max-w-2xl mx-auto text-center">

        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 mb-20"
        >
          <Image
            src="/logo.png"
            width={42}
            height={42}
            alt="AIRI logo"
          />

          <span className="font-serif font-bold tracking-[8px] text-sm">
            AIRI
          </span>
        </Link>

        {/* Error Code */}
        <p className="text-xs tracking-[0.4em] text-neutral-400 mb-8">
          ERROR 404
        </p>

        {/* Heading */}
        <h1 className="text-7xl md:text-9xl font-serif font-light tracking-widest mb-8">
          404
        </h1>

        <h2 className="text-xl md:text-2xl font-serif tracking-wide mb-5">
          Lost in the pages.
        </h2>

        {/* Description */}
        <p className="text-sm text-neutral-500 leading-loose">
          お探しのページは見つかりませんでした。
          <br />
          ページが移動または削除された可能性があります。
        </p>

        {/* Home Button */}
        <Link
          href="/"
          className="
            inline-flex items-center justify-center
            mt-14
            px-10 py-4
            border border-neutral-900
            text-[10px]
            tracking-[0.25em]
            transition-all duration-300
            hover:bg-neutral-900
            hover:text-white
          "
        >
          BACK TO HOME →
        </Link>

        {/* Footer Text */}
        <p className="mt-24 text-[10px] tracking-[0.3em] text-neutral-300">
          © AIRI
        </p>

      </section>

    </main>
  );
}
