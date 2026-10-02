import Link from "next/link";
import { LEVELS } from "@/content/levels";
import { PreferencesButton } from "@/components/PreferencesDialog";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-10 px-6 pb-safe pt-safe">
      <header className="flex items-center justify-between pt-4">
        <p lang="ml" className="font-malayalam text-2xl font-medium text-stone-500 dark:text-stone-400">
          മലയാളം
        </p>
        <PreferencesButton />
      </header>
      <section className="space-y-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance">
          Learn Malayalam
        </h1>
        <p className="text-lg text-stone-600 text-balance dark:text-stone-300">
          the way Kerala actually talks
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Lessons</h2>
        <ul className="space-y-3">
          {LEVELS.map((level) => (
            <li key={level.id} className="space-y-2">
              <h3 className="text-sm font-medium text-stone-500 dark:text-stone-400">
                {level.name}
              </h3>
              <ul className="space-y-2">
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
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Audio-first lessons in casual, everyday Malayalam. Short sessions, built
          for your phone.
        </p>
      </section>
    </main>
  );
}
