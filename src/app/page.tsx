import Link from "next/link";
import { LEVELS } from "@/content/levels";
import { PreferencesButton } from "@/components/PreferencesDialog";
import { ReviewLink } from "@/components/review/ReviewLink";
import { InstallPrompt } from "@/components/app/InstallPrompt";
import { HomeProgress } from "@/components/progress/HomeProgress";

/**
 * Home page design read (design-taste-frontend skill, Preserve mode):
 * mobile-first language-learning home for English-speaking beginners,
 * quietly editorial and honest, Tailwind v4 + the existing stone
 * neutrals, a typographic Malayalam hero, CSS-only load-in motion.
 *
 * Dials: DESIGN_VARIANCE 5 (asymmetric desktop layouts, single column
 * on mobile), MOTION_INTENSITY 4 (one load-in cascade, transform and
 * opacity only, gated by prefers-reduced-motion), VISUAL_DENSITY 3.
 * Shape rule: interactive elements are pills, cards are rounded-2xl.
 */

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-safe">
      <header className="flex items-center justify-between pt-4">
        <p lang="ml" className="font-malayalam text-2xl font-medium text-stone-500 dark:text-stone-400">
          മലയാളം
        </p>
        <div className="flex items-center gap-2">
          <InstallPrompt />
          <PreferencesButton />
        </div>
      </header>

      <section className="grid grid-cols-1 items-end gap-10 pt-16 md:pt-24 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <h1 className="animate-rise-in max-w-2xl text-5xl font-bold tracking-tight text-balance md:text-6xl">
            Learn Malayalam
          </h1>
          <p className="animate-rise-in max-w-prose text-lg text-stone-600 text-balance [animation-delay:80ms] dark:text-stone-300">
            the way Kerala actually talks
          </p>
          <Link
            href="#lessons"
            className="animate-rise-in inline-flex min-h-12 items-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 hover:bg-stone-700 focus-visible:outline active:bg-stone-700 [animation-delay:160ms] dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:hover:bg-stone-300 dark:active:bg-stone-300"
          >
            Start learning
          </Link>
        </div>
        <p
          lang="ml"
          aria-hidden="true"
          className="animate-rise-in hidden select-none font-malayalam text-8xl leading-none font-medium text-stone-300 [animation-delay:120ms] lg:col-span-5 lg:block lg:justify-self-end dark:text-stone-700"
        >
          മലയാളം
        </p>
      </section>

      <section
        id="lessons"
        className="animate-rise-in scroll-mt-10 border-t border-stone-200 pt-12 [animation-delay:240ms] dark:border-stone-800"
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Lessons</h2>
            <ReviewLink />
          </div>
          <ul className="space-y-6">
            {LEVELS.map((level) => (
              <li key={level.id} className="space-y-2">
                <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400">
                  {level.name}
                </h3>
                <ul className="max-w-2xl space-y-3">
                  {level.lessons.map((lesson, index) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/lesson/${lesson.id}`}
                        className="flex min-h-20 items-center justify-between gap-4 rounded-2xl border-2 border-stone-200 bg-white px-5 outline-2 outline-offset-2 outline-stone-900 hover:border-stone-400 focus-visible:outline active:border-stone-400 dark:border-stone-800 dark:bg-stone-900 dark:outline-stone-100 dark:hover:border-stone-600 dark:active:border-stone-600"
                      >
                        <span>
                          <span className="block text-sm text-stone-500 dark:text-stone-400">
                            Lesson {index + 1}
                          </span>
                          <span className="block text-base font-semibold">{lesson.title}</span>
                        </span>
                        <span className="shrink-0 text-sm text-stone-500 dark:text-stone-400">
                          {lesson.items.length} items
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="animate-rise-in border-t border-stone-200 pt-12 [animation-delay:320ms] dark:border-stone-800">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">What you&apos;ll be able to do</h2>
          <ul className="grid max-w-3xl grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
            {LEVELS.flatMap((level) => level.canDo).map((item) => (
              <li key={item} className="text-stone-600 dark:text-stone-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HomeProgress />

      <section className="animate-rise-in border-t border-stone-200 pt-12 pb-safe [animation-delay:400ms] dark:border-stone-800">
        <p className="max-w-prose text-xl font-medium text-stone-600 md:text-2xl dark:text-stone-300">
          Audio-first lessons in casual, everyday Malayalam. Short sessions, built for your
          phone.
        </p>
      </section>
    </main>
  );
}
