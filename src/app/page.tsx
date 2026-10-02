import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <p
        lang="ml"
        aria-hidden="true"
        className="font-malayalam text-5xl leading-none"
      >
        മലയാളം
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        Learn Malayalam
      </h1>
      <p className="text-xl text-balance text-neutral-600 dark:text-neutral-400">
        the way Kerala actually talks
      </p>
      <Link
        href="/lessons"
        className="mt-6 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-opacity active:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        Start learning
      </Link>
    </main>
  );
}
