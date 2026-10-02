export default function Home() {
  return (
    <>
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 pt-safe text-center">
        <p
          lang="ml"
          className="font-malayalam text-3xl font-medium text-stone-500 dark:text-stone-400"
        >
          മലയാളം
        </p>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Learn Malayalam
          </h1>
          <p className="text-lg text-stone-600 text-balance dark:text-stone-300">
            the way Kerala actually talks
          </p>
        </div>
        <a
          href="#coming-soon"
          className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-base font-medium text-stone-50 outline-2 outline-offset-2 outline-stone-900 focus-visible:outline active:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:outline-stone-100 dark:active:bg-stone-300"
        >
          See what&apos;s coming
        </a>
      </main>
      <section
        id="coming-soon"
        className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 pb-safe text-center"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Coming soon</h2>
        <p className="max-w-xs text-base text-stone-600 text-balance dark:text-stone-300">
          Audio-first lessons in casual, everyday Malayalam. Short sessions,
          built for your phone.
        </p>
      </section>
    </>
  );
}
