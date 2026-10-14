/**
 * Scene direction for the tea-shop POC (branch poc-visuals).
 *
 * This is the piece the product does not have yet: PLAN.md §5 (Level 5)
 * already rules that "scenes show the background — everything that happens
 * around the spoken lines ... on the turn it leads into", but the Lesson
 * type carries no scene data, so a turn is a line with no picture and no
 * story. Here the direction lives beside the renderer as POC data, keyed to
 * item ids that stay in content. If the style is adopted this table is what
 * moves into `Lesson.scene`, per item.
 *
 * The caption is the PLAN's "background" written for the box: one line of
 * plain English per turn, second person, no grammar jargon.
 */

import { levels } from "@/content";
import type { PanelId } from "./scenes";

export interface Beat {
  /** The content item this turn speaks. */
  itemId: string;
  panel: PanelId;
  /** What the picture shows, for screen readers. */
  panelLabel: string;
  speaker: "chettan" | "you";
  /** What happens around the line — shown in the box, above the Malayalam. */
  caption: string;
  manglish: string;
  script?: string;
  meaning: string;
}

const DIRECTION: Record<
  string,
  {
    panel: PanelId;
    panelLabel: string;
    speaker: Beat["speaker"];
    caption: string;
  }
> = {
  "chetta-oru-chaaya": {
    panel: 1,
    panelLabel:
      "The tea shop seen from the road: a tiled roof over a cream wall, a serving hatch with a tea board above it, and a coconut palm at the left corner. The learner stands on the road in front of it and calls out to the chettan inside.",
    speaker: "you",
    caption: "Late afternoon on the road, and you call out from the doorway.",
  },
  "sugar-idano": {
    panel: 2,
    panelLabel:
      "Behind the counter: the chettan holds a glass up, jars on the shelf behind him, the big kettle on the left and two glasses standing on the right.",
    speaker: "chettan",
    caption: "He takes a glass down off the shelf and looks up.",
  },
  "venda-chetta": {
    panel: 3,
    panelLabel:
      "Over the learner's shoulder: the chettan waits behind the counter holding the glass, with the sugar bowl and the kettle on the counter beside him.",
    speaker: "you",
    caption: "The spoon is already standing in the sugar bowl.",
  },
  "chaaya-ready": {
    panel: 4,
    panelLabel:
      "Close on the counter: one tall glass of tea, steaming, with the chettan's arm reaching up to it from the bottom of the frame and smaller glasses standing behind.",
    speaker: "chettan",
    caption: "The glass lands on the counter, hot enough to steam.",
  },
  "ethra-aayi-chetta": {
    panel: 5,
    panelLabel:
      "The chettan leaning on the counter with both hands down, the tea glass steaming in front of the learner.",
    speaker: "you",
    caption: "The road is quiet and the tea is good. You take your time over it before you ask.",
  },
  "patthu-roopa": {
    panel: 6,
    panelLabel: "The chettan behind the counter with both hands raised, fingers spread.",
    speaker: "chettan",
    caption: "He does not reach for the board. He holds up both hands.",
  },
  "thanks-chetta-pinne-kaanam": {
    panel: 7,
    panelLabel:
      "The learner walking away down the road with their back turned, the tea shop smaller behind them and the palm at the left corner.",
    speaker: "you",
    caption: "You leave the coins on the counter and step back out to the road.",
  },
};

const TEA_SHOP_LESSON = "l5u1l1";

export const lessonTitle =
  levels
    .flatMap((level) => level.lessons)
    .find((lesson) => lesson.id === TEA_SHOP_LESSON)?.title ?? TEA_SHOP_LESSON;

/**
 * The seven turns in order. Build-time guard: a content item without
 * direction (or direction without an item) fails the build rather than
 * silently rendering a beat with no picture.
 */
export function teaShopBeats(): Beat[] {
  const lesson = levels.flatMap((level) => level.lessons).find((l) => l.id === TEA_SHOP_LESSON);
  if (!lesson) throw new Error(`POC: lesson ${TEA_SHOP_LESSON} not found`);

  const missing = lesson.items.filter((item) => !DIRECTION[item.id]);
  if (missing.length > 0) {
    throw new Error(`POC: no direction for ${missing.map((i) => i.id).join(", ")}`);
  }

  return lesson.items.map((item) => ({
    itemId: item.id,
    manglish: item.manglish,
    script: item.script,
    meaning: item.meaning,
    ...DIRECTION[item.id],
  }));
}
