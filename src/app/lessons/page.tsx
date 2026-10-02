import Link from "next/link";
import { levels } from "@/content";

export default function LessonsPage() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-md px-4 py-8">
      <Link
        href="/"
        className="inline-flex min-h-11 min-w-11 items-center rounded-full text-sm text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:text-neutral-400"
      >
        Home
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Lessons</h1>
      {levels.map((level) => (
        <section key={level.id} className="mt-6">
          <h2 className="text-lg font-semibold">{level.name}</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {level.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <span className="font-medium">{lesson.title}</span>
                  <span className="shrink-0 text-sm text-neutral-500 dark:text-neutral-400">
                    {lesson.comprehensionOnly ? "Listening only" : `${lesson.items.length} items`}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </main>
  );
}
