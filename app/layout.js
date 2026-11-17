
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

import Footer from "@/app/components/Footer";
import MobileMenu from "@/app/components/MobileMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.airi-profile.com"),
  title: {
    default: "AIRI",
    template: "%s | AIRI",
  },
  icons: {
    icon: [
      {
        url: "/icon.png?v=2",
        type: "image/png",
      },
    ],
  },
  description:
    "AIRI's personal website. 日々の記録、ブログ、プロジェクトを紹介しています。",
  openGraph: {
    title: "AIRI",
    description: "AIRI's Profile",
    url: "https://www.airi-profile.com",
    siteName: "AIRI",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">

        {/* Header */}
        <header
          className="
            relative z-[100]
            flex items-center justify-between
            w-[94%] md:w-[85%] lg:w-1/2
            min-h-[65px] md:min-h-[70px]
            mx-auto mt-5 md:mt-8
            px-3 md:px-5
            border-b-2
          "
        >

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 md:gap-4 shrink-0"
          >
            <Image
              className="w-[36px] h-[36px] md:w-[50px] md:h-[50px]"
              src="/logo.png"
              width={100}
              height={100}
              alt="logo"
            />

            <h1
              className="
                tracking-[6px] md:tracking-[13px]
                font-bold font-serif text-xs
              "
            >
              AIRI
            </h1>
          </Link>

          {/* PC Navigation */}
          <nav className="hidden md:flex items-center text-black gap-6">

            <Link
              href="/"
              className="text-sm font-serif font-medium text-black hover:underline"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-sm font-serif font-medium text-black hover:underline"
            >
              About
            </Link>

            <Link
              href="/blog"
              className="text-sm font-serif font-medium text-black hover:underline"
            >
              Blog
            </Link>

            <Link
              href="/project"
              className="text-sm font-serif font-medium text-black hover:underline"
            >
              Project
            </Link>

          </nav>

          {/* Mobile Menu */}
          <MobileMenu />

        </header>

        {/* Main */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
