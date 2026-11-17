
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">

      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          flex items-center justify-center
          w-10 h-10
          text-3xl font-light
          cursor-pointer
          rounded
        "
        aria-label="メニューを開く"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {/* Fullscreen Menu */}
      <nav
        aria-hidden={!isOpen}
        className={`
          fixed inset-0 z-[110]
          w-screen h-dvh
          bg-white
          flex flex-col
          px-8 py-8
          overflow-y-auto

          transition-all duration-300

          ${
            isOpen
              ? "visible opacity-100 pointer-events-auto"
              : "invisible opacity-0 pointer-events-none"
          }
        `}
      >

        {/* Menu Header */}
        <div className="flex items-center justify-between border-b pb-6">

          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              width={45}
              height={45}
              alt="logo"
            />

            <span className="font-serif font-bold tracking-[8px] text-sm">
              AIRI
            </span>
          </Link>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeMenu}
            className="
              flex items-center justify-center
              w-12 h-12
              text-4xl font-light
              cursor-pointer
            "
            aria-label="メニューを閉じる"
          >
            ×
          </button>

        </div>

        {/* Navigation Links */}
        <div
          className="
            flex-1
            flex flex-col
            justify-center
            gap-10
            max-w-xl
            w-full
            mx-auto
            text-black
          "
        >

          <Link
            href="/"
            onClick={closeMenu}
            className="
  block
  text-black
  text-2xl
  font-serif
  tracking-widest
  hover:opacity-40
  transition-opacity
"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={closeMenu}
            className="
  block
  text-black
  text-2xl
  font-serif
  tracking-widest
  hover:opacity-40
  transition-opacity
"
          >
            About
          </Link>

          <Link
            href="/blog"
            onClick={closeMenu}
            className="
  block
  text-black
  text-2xl
  font-serif
  tracking-widest
  hover:opacity-40
  transition-opacity
"          >
            Blog
          </Link>

          <Link
            href="/project"
            onClick={closeMenu}
            className="
  block
  text-black
  text-2xl
  font-serif
  tracking-widest
  hover:opacity-40
  transition-opacity
"          >
            Project
          </Link>

        </div>

        {/* Menu Footer */}
        <div className="border-t pt-6">
          <p className="text-xs tracking-[4px] text-neutral-400 font-serif">
            © AIRI
          </p>
        </div>

      </nav>

    </div>
  );
}
