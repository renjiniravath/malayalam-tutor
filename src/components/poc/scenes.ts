/**
 * The seven tea-shop panels, as 64 x 44 pixel grids (POC, branch poc-visuals).
 *
 * The frame is 64 wide but only about 47 of those columns are ever seen: the
 * speaker's portrait hangs over columns 44 to 60 from row 18 down to the top
 * of the dialogue box. Scenery may run under it, but anything the learner
 * needs to look at is composed into the left two thirds, which is why the
 * kettle sits on the left of the counter and the palm stands at the left
 * corner. Panels are laid out to be read around the portrait, not cropped by
 * it.
 *
 * A panel is built by painting into an empty grid, back to front: sky, then
 * what is far away, then the building, then the counter, then whoever stands
 * behind it, then the things on the counter, then whatever is nearest the
 * camera. There is no camera transform and nothing is scaled to fake depth —
 * a thing is close because it is drawn big and low in the frame, which is how
 * the panels these are modelled on do it.
 *
 * Three painters are shared. `street` is the road outside the shop,
 * `interior` is the counter inside it, and `palm` is the tree at the corner,
 * so a panel is a background plus two or three sprites and the seven read as
 * one place.
 */

import { type Grid, box, disc, dither, grid, oval, stamp } from "./pixel";
import {
  CHETTAN_FACE,
  CHETTAN_HATCH,
  CHETTAN_HOLD,
  CHETTAN_LEAN,
  CHETTAN_REST,
  CHETTAN_SPREAD,
  GLASS,
  GLASS_CLOSE,
  JAR,
  KETTLE,
  LEARNER_BACK,
  LEARNER_CALL,
  LEARNER_FACE,
  SUGAR_BOWL,
  TEA_BOARD,
  stampOutlined,
} from "./sprites";

const SKY = 1;
const WHITE = 2;
const GRASS_L = 3;
const GRASS = 4;
const GRASS_D = 5;
const LEAF = 6;
const DIRT = 7;
const WOOD = 8;
const WOOD_D = 9;
const CREAM = 10;
const ROOF = 11;
const STEEL = 12;
const SKIN = 13;
const INK = 15;

/** Every panel is the same 64 x 44 sheet, so the seven share one geometry. */
const W = 64;
const H = 44;
const sheet = () => grid(W, H);

/** The horizon: grass below this row, distance above it. */
const HORIZON = 28;
/** Where the road starts, and so where anyone standing on it puts their feet. */
const KERB = 36;

export type PanelId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/* -------------------------------------------------------- backgrounds --- */

/** Sky, a treeline, a grass verge and the road, seen from the shop side. */
function street(g: Grid) {
  box(g, 0, 0, W, HORIZON, SKY);
  disc(g, 52, 6, 3, WHITE);
  oval(g, 13, 7, 7, 2, WHITE);
  oval(g, 18, 6, 4, 2, WHITE);
  oval(g, 33, 12, 6, 2, WHITE);
  dither(g, 0, HORIZON - 4, W, 4, SKY, WHITE);
  // distant treeline: three lumps, so the horizon is not a ruler line
  oval(g, 9, HORIZON - 2, 8, 4, LEAF);
  oval(g, 31, HORIZON - 3, 6, 4, LEAF);
  oval(g, 54, HORIZON - 2, 9, 4, LEAF);
  box(g, 0, HORIZON - 2, W, 2, LEAF);
  box(g, 0, HORIZON, W, KERB - HORIZON, GRASS);
  dither(g, 0, HORIZON, W, 3, GRASS, GRASS_L);
  // the road, with a kerb and a scatter of stones
  box(g, 0, KERB, W, H - KERB, DIRT);
  box(g, 0, KERB, W, 1, WOOD_D);
  box(g, 14, KERB + 4, 4, 1, WOOD_D);
  box(g, 34, KERB + 2, 3, 1, WOOD_D);
  box(g, 6, KERB + 6, 3, 1, WOOD_D);
  box(g, 52, KERB + 5, 5, 1, WOOD_D);
}

/**
 * The kada itself, standing on the verge across the road: tiled roof, cream
 * wall, a tea board and the hatch he serves through. `ground` is the row its
 * base sits on, so a shop further up the frame is a shop further away.
 */
function shop(g: Grid, x: number, ground: number) {
  const roofY = ground - 20;
  box(g, x + 2, roofY, 28, 1, ROOF);
  box(g, x + 1, roofY + 1, 30, 1, ROOF);
  box(g, x, roofY + 2, 32, 2, ROOF);
  box(g, x - 1, roofY + 4, 34, 1, WOOD_D);
  // the wall under it
  box(g, x + 2, roofY + 5, 28, 15, CREAM);
  box(g, x + 2, roofY + 5, 28, 1, WOOD_D);
  // The tea board, then the hatch under it: an opening eight rows deep, so
  // the bust in it is seen through the hole rather than over the wall. Both
  // sit on the left of the shop, because the learner standing in the road
  // covers the right of it and the chettan's face is the thing to keep.
  stamp(g, TEA_BOARD, x + 5, roofY + 6);
  box(g, x + 4, roofY + 11, 14, 8, WOOD_D);
  box(g, x + 4, roofY + 19, 14, 2, WOOD);
  // a shuttered window on the right, with its sill
  box(g, x + 20, roofY + 8, 9, 5, WOOD_D);
  box(g, x + 20, roofY + 8, 9, 1, WOOD);
  box(g, x + 20, roofY + 13, 10, 1, WOOD);
  // the bench outside
  box(g, x + 20, ground - 2, 10, 1, WOOD);
  box(g, x + 21, ground - 1, 1, 2, WOOD_D);
  box(g, x + 28, ground - 1, 1, 2, WOOD_D);
}

/** The chettan at the hatch, standing in the opening rather than over it. */
function hatchBust(g: Grid, x: number, ground: number) {
  stamp(g, CHETTAN_HATCH, x + 7, ground - 9);
}

/** A coconut palm: a trunk that leans as it climbs, and a crown of fronds. */
function palm(g: Grid, x: number, base: number) {
  for (let i = 0; i < 17; i++) {
    box(g, x + Math.round(i * 0.3), base - i, 3, 1, i % 4 === 0 ? WOOD_D : WOOD);
  }
  const cx = x + 6;
  const cy = base - 18;
  frond(g, cx, cy + 2, 7, -1, 0.3, GRASS_D);
  frond(g, cx, cy + 1, 6, -0.85, -0.25, LEAF);
  frond(g, cx, cy, 5, -0.4, -0.95, LEAF);
  frond(g, cx + 2, cy - 1, 5, 0.5, -0.85, LEAF);
  frond(g, cx + 3, cy + 1, 6, 0.9, -0.1, LEAF);
  frond(g, cx + 3, cy + 2, 6, 0.8, 0.45, GRASS_D);
  disc(g, cx, cy + 1, 2, LEAF);
}

/** One frond: leaf pixels stepping out from the crown along a slope. */
function frond(g: Grid, x: number, y: number, len: number, dx: number, dy: number, colour: number) {
  for (let i = 0; i < len; i++) {
    box(g, x + Math.round(i * dx), y + Math.round(i * dy), 2, 1, colour);
  }
}

/** The counter inside: cream wall, a shelf of jars, a bulb, wood in front. */
function interior(g: Grid, counterY = 30) {
  box(g, 0, 0, W, counterY, CREAM);
  box(g, 0, 0, W, 2, WOOD_D);
  box(g, 0, 2, W, 1, STEEL);
  box(g, 2, 14, 20, 1, WOOD);
  // jars and kettle are outlined like the characters: white glass and pale
  // steel against a cream wall is two pale things with no edge between them
  stampOutlined(g, JAR, 4, 8);
  stampOutlined(g, JAR, 9, 8);
  stampOutlined(g, JAR, 14, 8);
  stampOutlined(g, JAR, 19, 8);
  // the bulb on its wire, kept to the right where nobody stands
  box(g, 50, 3, 1, 7, WOOD_D);
  box(g, 49, 10, 3, 2, WHITE);
  box(g, 50, 12, 1, 1, WHITE);
  // the counter
  box(g, 0, counterY, W, H - counterY, WOOD);
  box(g, 0, counterY, W, 2, WOOD_D);
  box(g, 0, counterY + 2, W, 1, STEEL);
  // the front of the counter, broken into planks so it is not one brown slab
  box(g, 0, counterY + 7, W, 1, WOOD_D);
  [16, 32, 48].forEach((x) => box(g, x, counterY + 3, 1, H - counterY - 3, WOOD_D));
}

/**
 * The learner from behind, cropped by the frame and nearest the camera: the
 * back of the head, a strip of neck, and a shoulder across the bottom left.
 */
function overShoulder(g: Grid) {
  // his shoulder, filling the bottom left corner of the frame
  oval(g, 0, 50, 24, 17, INK);
  oval(g, 0, 50, 23, 16, STEEL);
  box(g, 0, 36, 21, 1, WOOD_D);
  // his neck, between the collar and the head
  box(g, 4, 29, 8, 9, INK);
  box(g, 5, 29, 6, 9, SKIN);
  // the back of his head. The brown oval under the black one is offset up
  // and left, so a one-pixel rim of light catches the hair: a plain black
  // disc read as a hole in the picture.
  oval(g, 5, 25, 10, 11, WOOD);
  oval(g, 6, 26, 9, 10, INK);
}

/* ------------------------------------------------------------- panels --- */

/** The learner on the road, calling across to the shop. */
function panel1(): Grid {
  const g = sheet();
  street(g);
  shop(g, 2, KERB - 2);
  hatchBust(g, 2, KERB - 2);
  palm(g, 0, KERB + 3);
  stampOutlined(g, LEARNER_CALL, 29, 25);
  return g;
}

/** The same road, but the learner is walking away down it. */
function panel7(): Grid {
  const g = sheet();
  street(g);
  shop(g, 2, KERB - 3);
  hatchBust(g, 2, KERB - 3);
  palm(g, 0, KERB + 2);
  stampOutlined(g, LEARNER_BACK, 29, 23);
  return g;
}

function panel2(): Grid {
  const g = sheet();
  interior(g);
  stampOutlined(g, KETTLE, 2, 21);
  stampOutlined(g, CHETTAN_HOLD, 18, 15);
  stampOutlined(g, GLASS, 38, 23);
  stampOutlined(g, GLASS, 42, 23);
  return g;
}

function panel3(): Grid {
  const g = sheet();
  interior(g);
  stampOutlined(g, KETTLE, 2, 21);
  stampOutlined(g, CHETTAN_REST, 20, 15);
  stampOutlined(g, SUGAR_BOWL, 38, 23);
  overShoulder(g);
  return g;
}

/** Close on the glass he has just set down, pushed up at the camera. */
function panel4(): Grid {
  const g = sheet();
  interior(g, 26);
  stamp(g, GLASS, 2, 19);
  stamp(g, GLASS, 7, 19);
  stamp(g, GLASS, 12, 19);
  stamp(g, GLASS_CLOSE, 20, 15);
  // steam off the top of it
  box(g, 23, 7, 1, 5, WHITE);
  box(g, 27, 3, 1, 7, WHITE);
  box(g, 31, 8, 1, 4, WHITE);
  // his arm, coming up from the bottom of the frame, hand still at the glass
  forearm(g, 33, 26, 9);
  return g;
}

/**
 * His arm, coming up from the bottom of the frame with the hand at the
 * glass. A diagonal in pixel art is a staircase rather than a slope, so the
 * band steps down two rows per column and each column is drawn six rows
 * tall, which overlaps the next one by four and keeps the arm in one piece.
 * The outline goes down first as a wider band and the skin over it, so the
 * two edges are clean; drawing an outline per column made it read as steps.
 */
function forearm(g: Grid, x: number, y: number, len: number) {
  for (let i = 0; i < len; i++) box(g, x + i - 1, y + i * 2 - 1, 4, 8, INK);
  for (let i = 0; i < len; i++) box(g, x + i, y + i * 2, 2, 6, SKIN);
  // his hand, closed around the side of the glass
  disc(g, x, y - 1, 4, INK);
  disc(g, x, y - 1, 3, SKIN);
}

function panel5(): Grid {
  const g = sheet();
  interior(g, 30);
  stampOutlined(g, KETTLE, 2, 21);
  stampOutlined(g, CHETTAN_LEAN, 20, 15);
  stampOutlined(g, GLASS, 38, 23);
  stampOutlined(g, GLASS, 42, 23);
  // the learner's own glass, near enough to sit at the front of the frame
  stamp(g, GLASS_CLOSE, 8, 24);
  return g;
}

function panel6(): Grid {
  const g = sheet();
  interior(g, 30);
  stampOutlined(g, KETTLE, 2, 21);
  stampOutlined(g, CHETTAN_SPREAD, 18, 9);
  stampOutlined(g, GLASS, 38, 23);
  stampOutlined(g, GLASS, 42, 23);
  return g;
}

/* --------------------------------------------------------------- api --- */

const PANELS: Record<PanelId, () => Grid> = {
  1: panel1,
  2: panel2,
  3: panel3,
  4: panel4,
  5: panel5,
  6: panel6,
  7: panel7,
};

/** Built once at module load: seven grids, a few thousand cells in total. */
const ART = new Map<PanelId, Grid>();

export function sceneArt(id: PanelId): Grid {
  let art = ART.get(id);
  if (!art) {
    art = PANELS[id]();
    ART.set(id, art);
  }
  return art;
}

export const PORTRAIT = { chettan: CHETTAN_FACE, you: LEARNER_FACE } as const;
