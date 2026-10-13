import type { Metadata } from "next";
import Link from "next/link";
import { TeaShopScene } from "@/components/poc/TeaShopScene";
import { lessonTitle, teaShopBeats } from "@/components/poc/scene-script";

export const metadata: Metadata = {
  title: "Tea shop scene — visual POC",
  description: "A drawn, static-panel treatment of the Level 5 tea-shop dialogue.",
  robots: { index: false },
};

/**
 * Visual proof of concept (branch poc-visuals, not for mainline): the
 * Level 5 tea-shop scene drawn as a run of static panels with a dialogue
 * box, to decide whether the style is worth carrying into the product.
 * Every panel is inline SVG — no image files, no assets, no motion.
 */
export default function TeaShopPocPage() {
  const beats = teaShopBeats();

  return (
    <main className="mx-auto w-full max-w-lg px-4 pb-12 pt-[calc(2rem+env(safe-area-inset-top))]">
      <p className="text-sm text-text-2">
        <Link
          href="/"
          className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          Learn Malayalam
        </Link>
      </p>

      <h1 className="mt-3 text-2xl font-bold tracking-tight">{lessonTitle}</h1>
      <p className="mt-1 text-sm text-text-2">
        Level 5, drawn as panels. One turn per panel, tap to go on.
      </p>

      <div className="mt-6">
        <TeaShopScene beats={beats} />
      </div>

      <p className="mt-10 text-sm text-text-2">
        Visual POC. The pictures are drawn in code; there is no audio yet, so the box shows
        the line straight away instead of holding the text back until it has been heard.
      </p>
    </main>
  );
}
