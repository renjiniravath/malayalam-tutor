/**
 * A pixel-art engine small enough to read (POC, branch poc-visuals).
 *
 * The whole scene is a grid of colour indices — 64 x 36 for a background,
 * 12 x 16 for a character — and every drawing is code that writes into that
 * grid. Rendering turns each row into runs of one colour, so a flat sky
 * costs one rectangle rather than sixty-four, and the SVG lands around a
 * tenth of the size a rect-per-pixel would.
 *
 * Two rules keep it looking like pixel art rather than like shapes drawn at
 * a small size: nothing is ever anti-aliased (`crispEdges`), and every
 * colour comes from the fifteen below. No gradients, no opacity, no
 * half-tones — a mix is done the pixel-art way, with a checkerboard.
 */

import type { ReactNode } from "react";

/** The fifteen. Index 0 is empty; everything else is a flat, saturated colour. */
export const PAL = [
  "none",
  "#7ec8e3", // 1 sky
  "#ffffff", // 2 white (clouds, steam, highlights)
  "#8fd95a", // 3 grass light
  "#5fbf3f", // 4 grass
  "#3f9c2c", // 5 grass dark
  "#2f6b2a", // 6 leaf
  "#d9c08a", // 7 dirt
  "#8a5a34", // 8 wood
  "#5e3b22", // 9 wood dark
  "#f0e2c8", // a cream (wall, chettan's shirt)
  "#a8503c", // b roof
  "#cfd6d8", // c steel (kettle, learner's shirt)
  "#b57a52", // d skin
  "#c9722c", // e tea
  "#2b201a", // f ink
] as const;

export type Colour = number;

export interface Grid {
  w: number;
  h: number;
  px: Uint8Array;
}

export function grid(w = 64, h = 36): Grid {
  return { w, h, px: new Uint8Array(w * h) };
}

function hexToIndex(ch: string): Colour {
  const i = "0123456789abcdef".indexOf(ch);
  if (i < 0) throw new Error(`pixel: '${ch}' is not a palette index (0-9, a-f)`);
  return i;
}

/* ------------------------------------------------------------ drawing --- */

export function put(g: Grid, x: number, y: number, colour: Colour) {
  if (x < 0 || y < 0 || x >= g.w || y >= g.h) return;
  g.px[y * g.w + x] = colour;
}

export function box(g: Grid, x: number, y: number, w: number, h: number, colour: Colour) {
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) put(g, i, j, colour);
}

/** A filled circle. Hard edges, so a small one reads as a chunky blob. */
export function disc(g: Grid, cx: number, cy: number, r: number, colour: Colour) {
  for (let j = cy - r; j <= cy + r; j++) {
    for (let i = cx - r; i <= cx + r; i++) {
      const dx = i - cx;
      const dy = j - cy;
      if (dx * dx + dy * dy <= r * r + r) put(g, i, j, colour);
    }
  }
}

export function oval(g: Grid, cx: number, cy: number, rx: number, ry: number, colour: Colour) {
  for (let j = cy - ry; j <= cy + ry; j++) {
    for (let i = cx - rx; i <= cx + rx; i++) {
      const dx = (i - cx) / rx;
      const dy = (j - cy) / ry;
      if (dx * dx + dy * dy <= 1.08) put(g, i, j, colour);
    }
  }
}

/**
 * The pixel-art way to mix two colours: a checkerboard. Used for the haze
 * at the horizon and the light on the grass, where a gradient would be the
 * lazy answer and would also break the look.
 */
export function dither(
  g: Grid,
  x: number,
  y: number,
  w: number,
  h: number,
  even: Colour,
  odd: Colour,
  phase = 0,
) {
  for (let j = y; j < y + h; j++) {
    for (let i = x; i < x + w; i++) put(g, i, j, (i + j + phase) % 2 === 0 ? even : odd);
  }
}

/* ------------------------------------------------------------ sprites --- */

export interface Sprite {
  rows: string[];
  w: number;
  h: number;
}

/**
 * A sprite is a list of strings, one per row, one character per pixel:
 * '0' is empty and 1-f are the palette. Row lengths are checked here rather
 * than discovered on screen — a hand-typed sprite that is one pixel short
 * fails the build instead of leaning over.
 */
export function sprite(rows: string[]): Sprite {
  const w = rows[0]?.length ?? 0;
  rows.forEach((row, y) => {
    if (row.length !== w) {
      throw new Error(`pixel: sprite row ${y} is ${row.length} wide, expected ${w}`);
    }
  });
  return { rows, w, h: rows.length };
}

/** Draw a sprite with its top-left corner at x, y. `scale` blows it up whole. */
export function stamp(g: Grid, s: Sprite, x: number, y: number, scale = 1) {
  s.rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === "0" || ch === ".") continue;
      const colour = hexToIndex(ch);
      if (scale === 1) put(g, x + i, y + j, colour);
      else box(g, x + i * scale, y + j * scale, scale, scale, colour);
    }
  });
}

/** A sprite on a grid of its own, for anything that is drawn by itself. */
export function toGrid(s: Sprite): Grid {
  const g = grid(s.w, s.h);
  stamp(g, s, 0, 0);
  return g;
}

/* ----------------------------------------------------------- renderer --- */

interface Run {
  x: number;
  y: number;
  w: number;
  c: Colour;
}

/** One rectangle per unbroken run of colour in a row. */
export function runs(g: Grid): Run[] {
  const out: Run[] = [];
  for (let y = 0; y < g.h; y++) {
    let x = 0;
    while (x < g.w) {
      const c = g.px[y * g.w + x];
      let w = 1;
      while (x + w < g.w && g.px[y * g.w + x + w] === c) w++;
      if (c !== 0) out.push({ x, y, w, c });
      x += w;
    }
  }
  return out;
}

/**
 * The art as an SVG. One unit is one pixel, so the caller sets the size and
 * the browser scales whole pixels — the drawing stays sharp at any width
 * because it is vector, and stays chunky because nothing is interpolated.
 */
export function PixelArt({
  art,
  label,
  className,
}: {
  art: Grid;
  label: string;
  className?: string;
}): ReactNode {
  return (
    <svg
      viewBox={`0 0 ${art.w} ${art.h}`}
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label={label}
    >
      {runs(art).map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={PAL[r.c]} />
      ))}
    </svg>
  );
}
