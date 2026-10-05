import Link from "next/link";
import { level1 } from "@/content";

/**
 * Home (redesign, mode Preserve). Design read: consumer language-learning
 * landing for English speakers on their phones, warm spoken-language
 * personality, editorial split hero + one inverted accent band.
 * Dials: DESIGN_VARIANCE 5, MOTION_INTENSITY 4, VISUAL_DENSITY 3.
 *
 * The script collage and the band show real lesson items, script-only:
 * romanization stays hidden until the learner hears it in a lesson.
 */

const firstWordIds = ["mazha", "engane-und", "sheri", "nammal"];

export default function Home() {
  const items = level1.lessons.flatMap((lesson) => lesson.items);
  const firstWords = firstWordIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <main className="mx-auto w-full max-w-md px-6 pb-6 pt-[calc(3rem+env(safe-area-inset-top))] md:max-w-4xl md:pt-20">
      {/* Hero: left-aligned copy, right staggered script collage (split on md) */}
      <section className="md:grid md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-x-16">
        <div className="md:col-start-2 md:row-start-1">
          <p
            lang="ml"
            aria-hidden="true"
            className="hero-enter hero-enter-1 font-malayalam text-5xl leading-none md:text-7xl"
          >
            മലയാളം
          </p>
          <div
            aria-hidden="true"
            className="mt-6 hidden flex-col gap-3 border-t border-foreground/15 pt-5 pl-6 md:flex"
          >
            <p lang="ml" className="font-malayalam text-3xl self-start">
              മഴ
            </p>
            <p lang="ml" className="font-malayalam text-2xl self-end pr-8 text-accent">
              എങ്ങനെ ഉണ്ട്
            </p>
            <p lang="ml" className="font-malayalam text-xl self-start pl-10">
              ശെരി
            </p>
          </div>
        </div>

        <div className="mt-8 md:col-start-1 md:row-start-1 md:mt-0">
          <h1 className="hero-enter hero-enter-2 text-4xl font-bold tracking-tight md:text-5xl">
            Learn Malayalam
          </h1>
          <p className="hero-enter hero-enter-3 mt-3 max-w-[24ch] text-xl text-balance text-neutral-600 dark:text-neutral-400">
            the way Kerala actually talks
          </p>
          <Link
            href="/lessons"
            className="hero-enter hero-enter-4 mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 font-medium text-accent-foreground transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Start learning
          </Link>
        </div>
      </section>

      {/* Accent band: the first words of the course, script-only */}
      <section className="mt-14 rounded-3xl bg-accent p-6 text-accent-foreground md:mt-20 md:p-10">
        <h2 className="text-base font-semibold">Your first words</h2>
        <p className="mt-1 text-sm">From the first lessons.</p>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {firstWords.map((item) => (
            <div key={item.id}>
              <p lang="ml" className="font-malayalam text-2xl leading-snug">
                {item.script}
              </p>
              <p className="mt-1 text-sm">{item.meaning}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
