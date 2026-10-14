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

/** How far the dialogue box rides up over the bottom of the scene. */
const OVERLAP = 46;

export function Stage({
  panel,
  panelLabel,
  portrait,
  caption,
  children,
}: {
  panel: PanelId;
  panelLabel: string;
  portrait: Sprite;
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
        <PixelArt art={sceneArt(panel)} label={panelLabel} className="block w-full" />
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
          The speaker's face, hung off the top edge of the box. It is a child
          of the box rather than of the frame so it stays put when the line
          runs to two lines, and it rides above the picture because the box
          it belongs to does.
        */}
        <div
          className="absolute right-3 bottom-full mb-1 w-[26%] overflow-hidden rounded-md border-[3px]"
          style={{
            borderColor: BOX.edge,
            background: "#7ec8e3",
            boxShadow: `0 0 0 2px #ffffff inset, 0 0 0 1px ${BOX.edge}`,
          }}
        >
          <PixelArt art={toGrid(portrait)} label="" className="block w-full" />
        </div>
        {children}
      </div>

      <p className="mt-2 px-1 text-[12px] italic leading-snug text-text-2">{caption}</p>
    </div>
  );
}

export { BOX, OVERLAP };
