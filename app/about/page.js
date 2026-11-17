
import Image from "next/image";
import Link from "next/link";

export const instant = false;

export default function AboutPage() {
  return (
<main className="w-full lg:w-1/2 max-w-none mx-auto text-neutral-900">

      {/* =========================
          Main Visual
      ========================= */}

      <section className="flex flex-col justify-center min-h-[85vh] w-full mx-auto px-6 md:px-10 py-20">

        <div className="mb-16">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="flex flex-col items-start">

          {/* Profile Logo */}

          <div className="relative w-28 h-28 md:w-36 md:h-36 mb-12">
            <Image
              src="/logo.png"
              alt="Site Logo"
              fill
              priority
              unoptimized
              sizes="144px"
              className="object-contain"
            />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-5">
            About / Profile
          </p>

          <h1 className="text-4xl md:text-6xl font-serif tracking-wide leading-[1.3] mb-8">
            Hello,
            <br />
            I'm Airi.
          </h1>

          <p className="text-sm md:text-base text-neutral-500 font-serif italic tracking-wide leading-relaxed max-w-lg">
            A curious mind, creating things
            and exploring possibilities.
          </p>

        </div>

        <div className="w-full mt-16 pt-5 border-t border-neutral-200 flex justify-between">

          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Personal Profile
          </span>

          <span className="text-[10px] tracking-widest text-neutral-400">
            No. 001
          </span>

        </div>

      </section>


      {/* =========================
          Introduction
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-24">

        <div className="mb-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
            Introduction / Who I Am
          </p>

          <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
            About Me
          </h2>

        </div>

        <div className="space-y-7">

          <p className="text-sm md:text-base text-neutral-600 leading-8 tracking-wide">
            はじめまして。愛理です。
          </p>

          <p className="text-sm md:text-base text-neutral-600 leading-8 tracking-wide">
            新しいことを知り、考え、実際に形にしていくことが好きです。
            日常の中にある小さな疑問から、新しい技術やアイデアまで、
            興味を持ったことを自分なりに探究しています。
          </p>

          <p className="text-sm md:text-base text-neutral-600 leading-8 tracking-wide">
            私にとって大切なのは、完成した結果だけではありません。
            そこに至るまでの過程や、人との関わり、
            試行錯誤の中で生まれる発見も大切にしています。
          </p>

          <p className="text-sm md:text-base text-neutral-600 leading-8 tracking-wide">
            まだ知らない世界に触れながら、自分らしい視点で物事を捉え、
            少しずつ新しい可能性を広げていきたいと思っています。
          </p>

        </div>

      </section>


      {/* =========================
          Interests
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-24">

        <div className="mb-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
            Interests / Curiosity
          </p>

          <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
            What I Love
          </h2>

        </div>

        <div className="space-y-0">

          {/* 01 */}

          <div className="py-9 border-t border-neutral-200">

            <div className="flex justify-between items-center mb-5">

              <h3 className="text-xl md:text-2xl font-serif tracking-wide">
                Technology & AI
              </h3>

              <span className="text-[10px] tracking-widest text-neutral-400">
                01
              </span>

            </div>

            <p className="text-sm text-neutral-500 leading-8">
              AIの仕組みや可能性に興味があります。
              人間とAIが協力し、新しい価値を生み出す未来を考えています。
              自分自身でもAIの開発や実験に取り組んでいます。
            </p>

          </div>

          {/* 02 */}

          <div className="py-9 border-t border-neutral-200">

            <div className="flex justify-between items-center mb-5">

              <h3 className="text-xl md:text-2xl font-serif tracking-wide">
                Programming & Creation
              </h3>

              <span className="text-[10px] tracking-widest text-neutral-400">
                02
              </span>

            </div>

            <p className="text-sm text-neutral-500 leading-8">
              アイデアを実際に動くものへと変えることが好きです。
              Web開発やプログラミングを学びながら、
              自分の考えを形にするための技術を探究しています。
            </p>

          </div>

          {/* 03 */}

          <div className="py-9 border-t border-neutral-200">

            <div className="flex justify-between items-center mb-5">

              <h3 className="text-xl md:text-2xl font-serif tracking-wide">
                Design & Expression
              </h3>

              <span className="text-[10px] tracking-widest text-neutral-400">
                03
              </span>

            </div>

            <p className="text-sm text-neutral-500 leading-8">
              デザインや文章、音声など、
              自分の考えや世界観を表現することにも関心があります。
              見た目だけでなく、そこに込められた意味や体験を大切にしています。
            </p>

          </div>

          {/* 04 */}

          <div className="py-9 border-t border-b border-neutral-200">

            <div className="flex justify-between items-center mb-5">

              <h3 className="text-xl md:text-2xl font-serif tracking-wide">
                People & Community
              </h3>

              <span className="text-[10px] tracking-widest text-neutral-400">
                04
              </span>

            </div>

            <p className="text-sm text-neutral-500 leading-8">
              人とのつながりや、一緒に何かをつくる時間を大切にしています。
              互いの個性や才能を認め合い、
              共に成長できる関係に魅力を感じています。
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          Philosophy
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-24">

        <div className="mb-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
            Philosophy / My Perspective
          </p>

          <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
            My Philosophy
          </h2>

        </div>

        <div className="py-12 border-y border-neutral-200">

          <h3 className="text-3xl md:text-4xl font-serif tracking-wide leading-[1.5] mb-10">
            "Let's build the future
            <br />
            with a big vision."
          </h3>

          <p className="text-sm text-neutral-500 leading-8 tracking-wide">
            大きな vision を持つこと。
            そして、その vision を実現するために一歩ずつ行動すること。
          </p>

          <p className="text-sm text-neutral-500 leading-8 tracking-wide mt-5">
            何かを始めるとき、最初から完璧である必要はないと思っています。
            試して、考えて、失敗して、また挑戦する。
            その過程そのものに価値があると考えています。
          </p>

        </div>

      </section>


      {/* =========================
          Currently
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-24">

        <div className="mb-12">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">
            Now / Beyond
          </p>

          <h2 className="text-4xl md:text-5xl font-serif tracking-wide">
            Currently
          </h2>

        </div>

        <p className="text-sm text-neutral-500 leading-8 mb-10">
          今は、プログラミングやAIの基礎を学びながら、
          自分のアイデアを実際のプロジェクトとして形にすることに取り組んでいます。
          学ぶことと創ることを繰り返しながら、
          自分にできることを少しずつ増やしています。
        </p>

        <div className="grid grid-cols-2 gap-6">

          <div className="border-t border-neutral-200 pt-5">
            <span className="text-[10px] tracking-widest text-neutral-400">
              LEARNING
            </span>
            <p className="text-lg font-serif mt-3">
              Programming
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-5">
            <span className="text-[10px] tracking-widest text-neutral-400">
              EXPLORING
            </span>
            <p className="text-lg font-serif mt-3">
              Artificial Intelligence
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-5">
            <span className="text-[10px] tracking-widest text-neutral-400">
              CREATING
            </span>
            <p className="text-lg font-serif mt-3">
              Digital Products
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-5">
            <span className="text-[10px] tracking-widest text-neutral-400">
              BELIEVING
            </span>
            <p className="text-lg font-serif mt-3">
              Human Connection
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          Closing
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-24">

        <div className="border-y border-neutral-200 py-16 text-center">

          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6">
            Thank You / For Visiting
          </p>

          <h2 className="text-3xl md:text-4xl font-serif tracking-wide leading-relaxed mb-8">
            The journey
            <br />
            has just begun.
          </h2>

          <p className="text-xs text-neutral-500 tracking-wide mb-10">
            Thank you for taking the time to know me.
          </p>

          <Link
            href="/"
            className="inline-flex bg-black text-white text-xs tracking-widest px-8 py-4 hover:bg-neutral-700 transition-colors"
          >
            BACK TO HOME
          </Link>

        </div>

      </section>


      {/* =========================
          Bottom Navigation
      ========================= */}

      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-12">

        <div className="border-t border-neutral-200 pt-8 flex justify-between items-center">

          <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            About / Profile
          </span>

          <span className="text-[10px] tracking-widest text-neutral-400">
            Personal Website
          </span>

        </div>

      </section>

    </main>
  );
}
