
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full lg:w-1/2 max-w-none mx-auto mt-auto bg-white text-black">

      <div className="w-full max-w-5xl mx-auto px-6 md:px-10">

        {/* Main Footer */}
        <div className="border-t border-neutral-300 py-14 flex flex-col md:flex-row justify-between gap-12">

          {/* Logo */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-4 w-fit">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="logo"
                className="w-[50px] h-[50px] object-contain"
              />

              <span className="tracking-[13px] font-bold font-serif text-xs">
                AIRI
              </span>
            </Link>

            <p className="text-xs text-neutral-400 font-serif tracking-wider leading-7">
              A personal space for thoughts,
              <br />
              creations and discoveries.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-16 md:gap-24">

            <div>
              <p className="text-[10px] font-serif tracking-[0.3em] text-neutral-400 mb-6 uppercase">
                Navigation
              </p>

              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/" className="text-xs font-serif tracking-widest hover:opacity-40 transition-opacity">
                    Home
                  </Link>
                </li>

                <li>
                  <Link href="/about" className="text-xs font-serif tracking-widest hover:opacity-40 transition-opacity">
                    About
                  </Link>
                </li>

                <li>
                  <Link href="/blog" className="text-xs font-serif tracking-widest hover:opacity-40 transition-opacity">
                    Blog
                  </Link>
                </li>

                <li>
                  <Link href="/product" className="text-xs font-serif tracking-widest hover:opacity-40 transition-opacity">
                    Project
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-serif tracking-[0.3em] text-neutral-400 mb-6 uppercase">
                Connect
              </p>

              <ul className="flex flex-col gap-4">

                <li>
                  <a
                    href="https://github.com/AiriHayashi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-serif tracking-widest hover:opacity-40 transition-opacity"
                  >
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-200 py-6 flex flex-col md:flex-row justify-between items-center gap-5">

<p className="text-[9px] font-serif tracking-[0.25em] text-neutral-400 uppercase">
  © 2026 AIRI. All Rights Reserved.
</p>

          <Link
            href="#top"
            className="text-[9px] font-serif tracking-[0.25em] text-neutral-400 hover:text-black transition-colors"
          >
            BACK TO TOP ↑
          </Link>

        </div>

      </div>
    </footer>
  );
}
