/**
 * The frame the whole scene sits in (POC, branch poc-visuals).
 *
 * Laid out after the game it is modelled on: the drawn scene fills the
 * frame, the speaker's face sits in a bordered panel at the right, and the
 * dialogue box runs across the bottom over the bottom of the picture. The
 * box is pulled up over the scene rather than placed under it, so the two
 * still read as one screen instead of a picture with a caption beneath it.
 */

import type { ReactNode } from "react";
import { PixelArt, toGrid } from "./pixel";
import type { Sprite } from "./pixel";
import { sceneArt, type PanelId } from "./scenes";

/**
 * Box colours. The border is the one place the palette is not used: it is
 * behind the type, so it needs contrast against white rather than the flat
 * saturation the drawing wants.
 */
const BOX = {
  edge: "#2f6b2a",
  inner: "#8fd9a8",
  face: "#232b3a",
  name: "#7fe3c0",
  line: "#ffffff",
  script: "#a9b6cc",
  gloss: "#93a0b6",
  caption: "#7d8aa0",
} as const;

/**
 * How far the dialogue box rides up over the bottom of the scene. Halved
 * from 46: the box was eating the bottom fifth of the picture at phone
 * width, which is where a scene's foreground lives. The box still overlaps
 * so the two read as one screen, but it now covers about an eighth.
 */
const OVERLAP = 22;

/**
 * The scene plate for each of the seven beats. Four plates, not seven: a
 * set-up is a camera position, and several beats happen in front of the same
 * one. Fewer plates means fewer chances for the place to drift, and a
 * learner learns one shop instead of seven rooms.
 *
 *   1  street     the road outside, the shop in front of you   beat 1
 *   2  making     behind the counter, the chettan pouring      beats 2, 3, 6
 *   3  counter    close on the counter, the glass handed over  beats 4, 5
 *   4  street     the same plate as beat 1                     beat 7
 *
 * Beat 7 reuses beat 1's plate rather than a second shot of the shop. Two
 * independent generations of the same building do not come out the same
 * building — the fast tier takes no reference images, so nothing carries the
 * roofline or the sign from one plate to the next, and the learner sees the
 * place change under them at the exact moment the story says they are
 * leaving it. The caption carries the leaving; the picture keeps the place.
 *
 * Beat 3 (`venda chetta`) is on the making plate, not the counter one: he
 * has not handed anything over yet at that point, so showing the tea
 * already standing on the counter would say the opposite of the line.
 *
 * The drawn panels in scenes.ts are still used where there is no plate.
 */
const PANEL_IMAGE: Partial<Record<PanelId, string>> = {
  1: "/poc/panels/plate1-street.png",
  2: "/poc/panels/plate2-making.png",
  3: "/poc/panels/plate2-making.png",
  4: "/poc/panels/plate3-counter.png",
  5: "/poc/panels/plate3-counter.png",
  6: "/poc/panels/plate2-making.png",
  7: "/poc/panels/plate1-street.png",
};

/**
 * A generated face for the portrait panel, in place of the drawn sprite.
 * 96 x 96 is deliberate: the panel is 26% of a 474px frame, and the scene
 * image is 384 pixels shown at that width, so 96 keeps the face at the same
 * pixel density as the world behind it.
 */
/**
 * A generated face for the portrait panel, in place of the drawn sprite.
 * 96 x 96 is deliberate: the panel is 24% of a 474px frame, and the scene
 * image is 384 pixels shown at that width, so 96 keeps the face at the same
 * pixel density as the world behind it.
 *
 * One face per speaker, deliberately. Per-turn expressions were built and
 * then dropped (2026-10-13): the fast tier takes no reference images, so the
 * only way to vary an expression is img2img, and at the strength that
 * actually moves the face (0.7) the man changes — the hairline recedes, the
 * moustache thickens, the shirt shifts colour. RD Pro's `rd_pro__edit` holds
 * much better and is still not the same man, at 6x the price. A face that
 * changes between slides is worse than a face that does not move, so the
 * expression is carried by the writing instead.
 */
const PORTRAIT_IMAGE: Partial<Record<string, string>> = {
  chettan: "/poc/panels/chettan.png",
  you: "/poc/panels/you.png",
};

export function Stage({
  panel,
  panelLabel,
  portrait,
  speaker,
  caption,
  children,
}: {
  panel: PanelId;
  panelLabel: string;
  portrait: Sprite;
  /** Who is talking. Selects the generated face when there is one. */
  speaker: string;
  /** What happens around the line. Narration, so it sits under the frame. */
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div
        className="overflow-hidden rounded-lg border-[3px]"
        style={{ borderColor: "#2b201a", background: "#7ec8e3" }}
      >
        {PANEL_IMAGE[panel] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PANEL_IMAGE[panel]}
            alt={panelLabel}
            className="block w-full"
            style={{ imageRendering: "auto" }}
          />
        ) : (
          <PixelArt art={sceneArt(panel)} label={panelLabel} className="block w-full" />
        )}
      </div>

      <div
        className="relative z-10 mx-2 rounded-md border-[3px] px-3 py-2.5"
        style={{
          marginTop: -OVERLAP - 3,
          borderColor: BOX.edge,
          background: BOX.face,
          boxShadow: `inset 0 0 0 2px ${BOX.inner}, inset 0 0 0 3px #ffffff`,
        }}
      >
        {/*
          The speaker's face, seated inside the box rather than hung above
          it. Hung above, it was covering the right third of the picture for
          the top half of the scene's height. Inside, it costs the picture
          nothing, and the line keeps clear of it with the padding below.
        */}
        <div
          className="absolute right-3 top-1/2 w-[24%] -translate-y-1/2 overflow-hidden rounded-md border-[3px]"
          style={{
            borderColor: BOX.edge,
            background: "#7ec8e3",
            boxShadow: `0 0 0 2px #ffffff inset, 0 0 0 1px ${BOX.edge}`,
          }}
        >
          {PORTRAIT_IMAGE[speaker] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PORTRAIT_IMAGE[speaker]} alt="" className="block w-full" />
          ) : (
            <PixelArt art={toGrid(portrait)} label="" className="block w-full" />
          )}
        </div>
        {/* Room for the face, so the line never runs under it. */}
        <div className="pr-[28%]">{children}</div>
      </div>

      <p className="mt-2 px-1 text-[12px] italic leading-snug text-text-2">{caption}</p>
    </div>
  );
}

export { BOX, OVERLAP };
