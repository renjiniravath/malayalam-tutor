import type { Metadata } from "next";
import Link from "next/link";
import { PixelArt } from "@/components/poc/pixel";
import { sceneArt } from "@/components/poc/scenes";
import { teaShopBeats } from "@/components/poc/scene-script";

export const metadata: Metadata = {
  title: "Tea shop panels — visual POC",
  robots: { index: false },
};

/**
 * Contact sheet: all seven drawn panels at once, with the caption each one
 * runs under. Review aid for the POC — it is the fastest way to judge
 * whether the drawings hold up as a set.
 */
export default function TeaShopPanelsPage() {
  const beats = teaShopBeats();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16 pt-[calc(2rem+env(safe-area-inset-top))]">
      <p className="text-sm text-text-2">
        <Link href="/poc/tea-shop" className="underline underline-offset-4">
          The scene
        </Link>
      </p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">The seven panels</h1>
      <p className="mt-1 text-sm text-text-2">
        Drawn in code, no image files. Each panel is a 64x44 grid of pixels, fifteen colours.
      </p>

      <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {beats.map((beat, i) => (
          <li key={beat.itemId} className="rounded-xl border border-line p-2">
            <div className="overflow-hidden rounded-lg border-[3px]" style={{ borderColor: "#2b201a" }}>
              <PixelArt art={sceneArt(beat.panel)} label={beat.panelLabel} className="block w-full" />
            </div>
            <p className="mt-2 text-xs text-text-2">
              {i + 1}. {beat.speaker === "you" ? "You" : "Chettan"}: {beat.manglish}
            </p>
          </li>
        ))}
      </ol>
    </main>
  );
}
