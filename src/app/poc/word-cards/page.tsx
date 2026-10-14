import type { Metadata } from "next";
import Link from "next/link";
import { levels, type Item } from "@/content";

export const metadata: Metadata = {
  title: "Word cards — visual POC",
  description: "Six vocabulary items as still illustrations, before the audio and after the reveal.",
  robots: { index: false },
};

/** Every item in the content, keyed by its immutable id (PLAN.md §11). */
const itemsById = new Map<string, Item>(
  levels.flatMap((level) =>
    level.lessons.flatMap((lesson) =>
      lesson.items.map((item): [string, Item] => [item.id, item]),
    ),
  ),
);

interface Card {
  /** The content item this card shows. All of its text is read from the item. */
  id: string;
  /** Generated plates in public/poc/words/ — more than one means pick a version. */
  images: string[];
}

const NOUNS: Card[] = [
  { id: "kaappi", images: ["/poc/words/kaappi.png"] },
  { id: "chaaya", images: ["/poc/words/chaaya.png"] },
  { id: "veedu", images: ["/poc/words/veedu.png"] },
  { id: "kada", images: ["/poc/words/kada.png"] },
  { id: "ila", images: ["/poc/words/ila.png"] },
];

const VERBS: Card[] = [
  {
    id: "kudikkuva",
    images: ["/poc/words/kudikkuva-a.png", "/poc/words/kudikkuva-b.png"],
  },
];

/**
 * The vocabulary card as the product would play it (branch poc-visuals, not
 * for mainline). One item, shown twice: the picture alone while the slow
 * recording plays (PLAN.md §6 step 1), then the same picture with the word,
 * the script and the meaning once it has been heard. The word, the script and
 * the meaning are read off the content item; only the choice of picture, and
 * which group it sits under, live here.
 */
export default function WordCardsPocPage() {
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

      <h1 className="mt-3 text-2xl font-bold tracking-tight">Word cards</h1>
      <p className="mt-1 text-sm text-text-2">
        Six items from the real content, each shown twice: first the picture on its own, as the
        learner sees it while the slow recording plays, then the same picture with the word once
        it has been heard. The pictures are generated illustrations, in place of the drawings in
        code the first round used.
      </p>

      <Section title="Nouns" cards={NOUNS} note="Each picture is the thing itself." />

      <Section
        title="Verbs"
        cards={VERBS}
        note="A verb's picture shows the action, not the object. kudikkuva is what the person is doing — someone drinking — so it cannot be taken for chaaya, the glass of tea itself. Two takes on that action are below: say which one reads as drinking fastest."
      />

      <p className="mt-8 text-[11px] leading-relaxed text-text-3">
        The headings, the two captions and the ids are for whoever is judging these cards, and
        are not part of a card: in the app the learner gets the picture and the recording, then
        the word, and no caption anywhere. The pictures are generated images with no licence
        record — nothing in src/content/images/manifest.ts, and none of these files is wired
        into a content item yet. Each one needs a record there before it ships.
      </p>
    </main>
  );
}

function Section({ title, cards, note }: { title: string; cards: Card[]; note: string }) {
  return (
    <section>
      <h2 className="mt-8 text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-sm text-text-2">{note}</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.id}>
            <WordCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function WordCard({ card }: { card: Card }) {
  const item = itemsById.get(card.id);
  if (!item) {
    return (
      <div className="rounded-xl border border-line p-3">
        <p className="text-sm text-text-2">
          No content item has the id {card.id}, so there is no word, script or meaning to show
          for this picture.
        </p>
      </div>
    );
  }

  return (
    <article className="rounded-xl border border-line p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-text-3">{card.id}</p>
      {card.images.map((src, i) => (
        <div key={src} className={i === 0 ? "mt-2" : "mt-4 border-t border-line pt-4"}>
          {card.images.length > 1 && (
            <p className="mb-1 text-[11px] text-text-3">
              Version {String.fromCharCode(65 + i)} of {card.images.length}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <figure>
              <figcaption className="mb-1 text-[11px] text-text-3">Before the audio</figcaption>
              <Plate src={src} />
            </figure>
            <figure>
              <figcaption className="mb-1 text-[11px] text-text-3">After the reveal</figcaption>
              <div
                className="rounded-lg border-[3px] p-2"
                style={{ borderColor: "#2b201a", background: "#f0e2c8" }}
              >
                <Plate src={src} />
                <p className="mt-2 text-center text-lg font-semibold leading-tight">
                  {item.manglish}
                </p>
                {item.script && (
                  <p lang="ml" className="font-malayalam text-center text-base text-text-2">
                    {item.script}
                  </p>
                )}
                <p className="text-center text-sm text-text-2">{item.meaning}</p>
              </div>
            </figure>
          </div>
        </div>
      ))}
    </article>
  );
}

/** The picture on its own — the card before the answer, with nothing written on it. */
function Plate({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={1536}
      height={1536}
      className="block h-auto w-full rounded-md"
      style={{ imageRendering: "auto" }}
    />
  );
}
