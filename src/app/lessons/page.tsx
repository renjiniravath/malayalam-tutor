import Link from "next/link";
import { levels } from "@/content";
import { ReviewLink } from "@/components/review/ReviewLink";

export default function LessonsPage() {
  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-md px-4 pb-8 pt-[calc(2rem+env(safe-area-inset-top))]">
      <Link
        href="/"
        className="inline-flex min-h-11 min-w-11 items-center rounded-full text-sm text-text-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        Home
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lessons</h1>
        <ReviewLink />
      </div>
      {levels.map((level) => (
        <section key={level.id} className="mt-6">
          <h2 className="text-lg font-semibold">{level.name}</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {level.lessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  <span className="font-medium">{lesson.title}</span>
                  <span className="shrink-0 text-sm text-text-2">
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
