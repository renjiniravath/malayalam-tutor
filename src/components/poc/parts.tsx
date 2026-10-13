/**
 * The drawn parts every tea-shop panel is assembled from (POC, branch
 * poc-visuals). Flat vector shapes with one chunky warm-black outline, no
 * gradients, no motion, no external assets — the whole scene is code.
 *
 * Every part is drawn in local units around an anchor: the base of the
 * thing (feet, counter line, glass bottom) sits at (0, 0), so a caller
 * places it with a single transform. Panels are a 320x200 viewBox, which
 * is 1.125 CSS px per unit on a 360 px phone.
 *
 * Ink weight is constant in the frame, not in the object: a zoomed-in
 * glass keeps the same 2-unit line as a distant one, because the pen did
 * not change size when the camera moved. That is what `inkAt` is for.
 */

import type { ReactNode } from "react";
import { PALETTE } from "./palette";

/** The one outline weight, in panel units. */
export const INK_WEIGHT = 2;

export const INK = {
  stroke: PALETTE.ink,
  strokeWidth: INK_WEIGHT,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

/** Outline at a constant weight in panel units, for a part drawn at `scale`. */
export function inkAt(scale: number, weight = INK_WEIGHT) {
  return { ...INK, strokeWidth: weight / scale };
}

type At = { x: number; y: number; scale?: number; flip?: boolean };

function place({ x, y, scale = 1, flip }: At) {
  return `translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`;
}

/* ---------------------------------------------------------------- sky --- */

/**
 * Flat sky in two bands plus a low sun. Bands rather than a gradient: the
 * panels are meant to read as flat colour, not as a rendered image.
 */
export function Sky() {
  return (
    <g>
      <rect x={0} y={0} width={320} height={78} fill={PALETTE.skyTop} />
      <rect x={0} y={78} width={320} height={40} fill={PALETTE.skyLow} />
      <circle cx={252} cy={62} r={17} fill={PALETTE.sun} />
      <path d="M60 92 q10 -7 20 0 q10 -7 20 0" fill="none" stroke={PALETTE.skyLow} strokeWidth={3} strokeLinecap="round" />
      <path d="M118 78 q8 -6 16 0 q8 -6 16 0" fill="none" stroke={PALETTE.skyLow} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/* --------------------------------------------------------------- palm --- */

/** Coconut palm: a trunk that leans, and fronds drawn as filled crescents. */
export function Palm({ x, y, scale = 1, flip }: At) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale, flip })}>
      <path d="M-4 0 Q-1 -34 -10 -66 L-2 -68 Q7 -34 4 0 Z" fill={PALETTE.trunk} {...ink} />
      <g transform="translate(-6 -68)">
        <path d="M0 2 Q-30 -12 -40 6 Q-22 -2 0 8 Z" fill={PALETTE.palm} {...ink} />
        <path d="M0 2 Q-22 -22 -38 -18 Q-18 -12 0 8 Z" fill={PALETTE.palmDark} {...ink} />
        <path d="M0 2 Q22 -22 38 -18 Q18 -12 0 8 Z" fill={PALETTE.palm} {...ink} />
        <path d="M0 2 Q30 -12 40 6 Q22 -2 0 8 Z" fill={PALETTE.palmDark} {...ink} />
        <path d="M0 2 Q-14 -24 -4 -36 Q6 -20 0 8 Z" fill={PALETTE.palm} {...ink} />
        <circle cx={-3} cy={8} r={4} fill={PALETTE.trunk} {...ink} />
        <circle cx={6} cy={11} r={3.5} fill={PALETTE.trunk} {...ink} />
      </g>
    </g>
  );
}

/* --------------------------------------------------------------- road --- */

/** Road band with a kerb line; the shop sits on the far side of it. */
export function Road({ y }: { y: number }) {
  return (
    <g>
      <rect x={0} y={y} width={320} height={200 - y} fill={PALETTE.road} />
      <rect x={0} y={y} width={320} height={4} fill={PALETTE.roadDark} />
      <path
        d={`M18 ${y + 22} h26 M74 ${y + 30} h18 M198 ${y + 18} h24 M246 ${y + 34} h14`}
        stroke={PALETTE.roadDark}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}

/* ---------------------------------------------------------- shop front --- */

/**
 * The kada itself: tiled roof over a cream wall, a dark serving hatch with
 * the counter across it, the tea board above, and a bench out front.
 */
export function ShopFront({ x = 0, y = 0, scale = 1 }: At) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale })}>
      {/* roof */}
      <path d="M2 72 L18 46 L192 46 L208 72 Z" fill={PALETTE.roof} {...ink} />
      <path d="M2 72 L208 72 L206 78 L4 78 Z" fill={PALETTE.roofDark} {...ink} />
      {/* wall */}
      <rect x={14} y={76} width={178} height={76} fill={PALETTE.wall} {...ink} />
      <rect x={14} y={76} width={178} height={7} fill={PALETTE.wallShade} />
      {/* serving hatch */}
      <rect x={104} y={98} width={80} height={54} fill={PALETTE.woodDark} {...ink} />
      <rect x={100} y={142} width={88} height={12} fill={PALETTE.wood} {...ink} />
      {/* jars on the hatch shelf */}
      <rect x={112} y={112} width={13} height={18} rx={2} fill={PALETTE.glass} {...ink} />
      <rect x={131} y={116} width={11} height={14} rx={2} fill={PALETTE.teaLight} {...ink} />
      <rect x={148} y={110} width={14} height={20} rx={2} fill={PALETTE.glass} {...ink} />
      <rect x={169} y={117} width={10} height={13} rx={2} fill={PALETTE.milk} {...ink} />
      {/* tea board */}
      <rect x={118} y={78} width={54} height={20} rx={2} fill={PALETTE.board} {...ink} />
      <text
        x={145}
        y={93}
        textAnchor="middle"
        fontSize={15}
        fill={PALETTE.boxEdge}
        fontFamily="var(--font-noto-malayalam)"
      >
        ചായ
      </text>
      {/* window shutter, left of the hatch */}
      <rect x={34} y={98} width={48} height={34} fill={PALETTE.wallShade} {...ink} />
      <path d="M34 115 h48 M52 98 v34" stroke={PALETTE.ink} strokeWidth={2 / scale} />
      {/* stack of glasses on the sill */}
      <rect x={40} y={132} width={38} height={9} fill={PALETTE.steel} {...ink} />
      {/* bench */}
      <rect x={22} y={140} width={64} height={7} fill={PALETTE.wood} {...ink} />
      <rect x={28} y={147} width={6} height={16} fill={PALETTE.woodDark} {...ink} />
      <rect x={74} y={147} width={6} height={16} fill={PALETTE.woodDark} {...ink} />
      {/* ground shadow */}
      <ellipse cx={104} cy={165} rx={96} ry={5} fill={PALETTE.roadDark} opacity={0.35} />
    </g>
  );
}

/* -------------------------------------------------------------- glass --- */

/**
 * A tea glass: tapered tumbler, tea, a pale froth line, optional steam.
 * `line` is the outline weight in panel units — a glass pushed up to the
 * camera keeps the pen it had at the back of the counter.
 */
export function Glass({
  x,
  y,
  scale = 1,
  steam = false,
  fill = PALETTE.tea,
  line = INK_WEIGHT,
}: At & { steam?: boolean; fill?: string; line?: number }) {
  const ink = inkAt(scale, line);
  return (
    <g transform={place({ x, y, scale })}>
      {steam && (
        <path
          d="M-3 -22 Q-8 -30 -2 -38 Q4 -46 -1 -54 M6 -22 Q11 -31 5 -39"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.6 / scale}
          strokeLinecap="round"
          opacity={0.8}
        />
      )}
      <path d="M-7 0 L-6 -20 L6 -20 L7 0 Z" fill={PALETTE.glass} {...ink} />
      <path d="M-5.5 -2 L-4.8 -15 L4.8 -15 L5.5 -2 Z" fill={fill} />
      <path d="M-4.8 -14 L4.8 -14 L4.9 -12 L-4.9 -12 Z" fill={PALETTE.teaLight} />
      <path d="M-7 0 L-6 -20" stroke={PALETTE.ink} strokeWidth={1.2 / scale} opacity={0.5} />
    </g>
  );
}

/** A rank of glasses on a shelf or counter, evenly spaced. */
export function GlassRow({ x, y, count, gap = 15, scale = 1 }: At & { count: number; gap?: number }) {
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <Glass key={i} x={x + i * gap} y={y} scale={scale} />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------- kettle --- */

/** The big aluminium kettle that every tea shop has on the counter. */
export function Kettle({ x, y, scale = 1, flip }: At) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale, flip })}>
      <path d="M-17 -6 Q-21 -16 -15 -30 L15 -30 Q21 -16 17 -6 Q10 2 0 2 Q-10 2 -17 -6 Z" fill={PALETTE.steel} {...ink} />
      <path d="M-13 -30 L13 -30 L9 -37 L-9 -37 Z" fill={PALETTE.steelDark} {...ink} />
      <circle cx={0} cy={-41} r={3.5} fill={PALETTE.steel} {...ink} />
      <path d="M12 -26 L26 -34 L29 -30 L15 -18 Z" fill={PALETTE.steelDark} {...ink} />
      <path d="M-16 -22 Q-30 -18 -16 -8" fill="none" stroke={PALETTE.ink} strokeWidth={3 / scale} strokeLinecap="round" />
      <path d="M-9 -28 Q-4 -14 -6 -2" fill="none" stroke={PALETTE.boxEdge} strokeWidth={2.5 / scale} opacity={0.55} strokeLinecap="round" />
    </g>
  );
}

/* --------------------------------------------------------- hand, limb --- */

/**
 * An arm or a leg: one thick stroke with an ink outline behind it. The
 * outline is drawn first at double the weight, so a bare stroke never
 * breaks the drawing's single-line look.
 */
export function Limb({
  d,
  scale = 1,
  width = 9,
  color = PALETTE.skin,
}: {
  d: string;
  scale?: number;
  width?: number;
  color?: string;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={PALETTE.ink}
        strokeWidth={(width + 2 * INK_WEIGHT) / scale}
        strokeLinecap="round"
      />
      <path d={d} fill="none" stroke={color} strokeWidth={width / scale} strokeLinecap="round" />
    </g>
  );
}

/**
 * A hand. Individual fingers do not survive a 2-unit ink line at panel
 * scale — four fingers across a 15-unit hand is a 3 px gap on a phone — so
 * this is a mitten with a thumb, which reads as a hand at every size the
 * panels use. The price beat carries "ten" with both hands up and the
 * caption, not with knuckles.
 */
export function Hand({ x, y, scale = 1, flip }: At) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale, flip })}>
      <path
        d="M-6.5 6 Q-9 1 -7.5 -7 Q-5 -13 0 -13 Q5 -13 7.5 -7 Q9 1 6.5 6 Q3 9 0 9 Q-3 9 -6.5 6 Z"
        fill={PALETTE.skin}
        {...ink}
      />
      <path d="M-6 -1 Q-12 0 -11 5 Q-10 8 -6 7" fill={PALETTE.skin} {...ink} />
    </g>
  );
}

/** The sugar bowl, usually with a spoon standing in it. */
export function SugarBowl({ x, y, scale = 1 }: At) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale })}>
      <path d="M-16 0 Q-19 -14 0 -14 Q19 -14 16 0 Q10 4 0 4 Q-10 4 -16 0 Z" fill={PALETTE.glass} {...ink} />
      <path d="M-13 -6 Q-8 -9 0 -9 Q8 -9 13 -6 Q8 -3 0 -3 Q-8 -3 -13 -6 Z" fill={PALETTE.boxEdge} opacity={0.9} />
      <path d="M-8 -12 Q0 -20 8 -12 Z" fill={PALETTE.steelDark} {...ink} />
      <path d="M6 -14 L14 -26" stroke={PALETTE.steelDark} strokeWidth={3.4 / scale} strokeLinecap="round" />
      <path d="M6 -14 L14 -26" stroke={PALETTE.ink} strokeWidth={1.2 / scale} strokeLinecap="round" opacity={0.4} />
    </g>
  );
}

/* ------------------------------------------------------------ chettan --- */

export type ChettanArms = "rest" | "hold" | "spread" | "lean";

/**
 * The kada chettan, cut off at the counter: torso, head, moustache and the
 * towel over his shoulder. Arm variants carry the beat — resting, holding
 * out the glass, both hands up for the price, leaning on the counter.
 */
export function Chettan({ x, y, scale = 1, arms = "rest" }: At & { arms?: ChettanArms }) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale })}>
      {arms === "spread" && (
        <>
          <Limb d="M-24 -44 Q-44 -54 -50 -70" scale={scale} />
          <Limb d="M24 -44 Q44 -54 50 -70" scale={scale} />
          <Hand x={-53} y={-76} scale={1.05} />
          <Hand x={53} y={-76} scale={1.05} flip />
        </>
      )}
      {arms === "hold" && (
        <>
          <Limb d="M20 -42 Q36 -40 36 -28" scale={scale} />
          <Glass x={36} y={-24} scale={1.05} />
          <Limb d="M-20 -42 Q-34 -44 -36 -34" scale={scale} />
        </>
      )}
      {arms === "lean" && (
        <>
          <Limb d="M-22 -42 Q-42 -34 -45 -12" scale={scale} />
          <Limb d="M22 -42 Q42 -34 45 -12" scale={scale} />
          <Hand x={-47} y={-8} scale={0.9} flip />
          <Hand x={47} y={-8} scale={0.9} />
        </>
      )}
      {/* torso */}
      <path d="M-28 4 L-26 -34 Q-24 -50 0 -50 Q24 -50 26 -34 L28 4 Z" fill={PALETTE.shirt} {...ink} />
      <path d="M-26 -34 Q-12 -28 0 -28 Q12 -28 26 -34 L28 4 L14 4 L12 -30 L-12 -30 L-14 4 L-28 4 Z" fill={PALETTE.shirtDark} opacity={0.5} />
      <path d="M-9 -50 L0 -36 L9 -50" fill="none" stroke={PALETTE.ink} strokeWidth={2 / scale} strokeLinejoin="round" />
      {/* towel over the shoulder */}
      <path d="M-27 -42 L-35 -4 L-20 -4 L-19 -40 Z" fill={PALETTE.towel} {...ink} />
      <path d="M-24 -30 L-31 -28 M-23 -20 L-30 -18" stroke={PALETTE.roof} strokeWidth={1.8 / scale} strokeLinecap="round" />
      {/* neck and head */}
      <rect x={-7} y={-60} width={14} height={13} rx={3} fill={PALETTE.skinDark} {...ink} />
      <circle cx={0} cy={-74} r={16} fill={PALETTE.ink} />
      <circle cx={0} cy={-70} r={14} fill={PALETTE.skin} {...ink} />
      <path d="M-14 -72 Q0 -84 14 -72 Q0 -77 -14 -72 Z" fill={PALETTE.ink} />
      <circle cx={-5.5} cy={-72} r={1.7} fill={PALETTE.ink} />
      <circle cx={5.5} cy={-72} r={1.7} fill={PALETTE.ink} />
      <path d="M-9.5 -76.5 Q-5.5 -78.5 -2 -76.5 M2 -76.5 Q5.5 -78.5 9.5 -76.5" fill="none" stroke={PALETTE.ink} strokeWidth={1.6 / scale} strokeLinecap="round" />
      <path d="M-8 -64 Q-4 -68 0 -65 Q4 -68 8 -64 Q4 -61.5 0 -62 Q-4 -61.5 -8 -64 Z" fill={PALETTE.ink} />
      <circle cx={-14} cy={-70} r={2.6} fill={PALETTE.skinDark} {...ink} />
      <circle cx={14} cy={-70} r={2.6} fill={PALETTE.skinDark} {...ink} />
    </g>
  );
}

/* ------------------------------------------------------------ learner --- */

/** The learner: a plain standing figure, front-on or walking away. */
export function Learner({
  x,
  y,
  scale = 1,
  facing = "front",
  arm = "down",
}: At & { facing?: "front" | "back"; arm?: "down" | "out" | "raise" }) {
  const ink = inkAt(scale);
  return (
    <g transform={place({ x, y, scale })}>
      {arm === "out" && <Limb d="M11 -30 Q24 -34 26 -44" scale={scale} width={5} />}
      {arm === "raise" && <Limb d="M11 -32 Q26 -40 27 -54" scale={scale} width={5} />}
      {/* legs */}
      <path d="M-8 0 L-7 -28 L-1 -28 L-1 0 Z" fill={PALETTE.trouser} {...ink} />
      <path d="M1 0 L1 -28 L7 -28 L8 0 Z" fill={PALETTE.trouserDark} {...ink} />
      <path d="M-9 0 h9 v3 h-11 Z" fill={PALETTE.ink} />
      <path d="M1 0 h9 l2 3 h-11 Z" fill={PALETTE.ink} />
      {/* torso */}
      <path d="M-12 -26 L-13 -54 Q0 -60 13 -54 L12 -26 Z" fill={PALETTE.trouser} {...ink} />
      <path d="M-13 -54 Q0 -60 13 -54 L12 -44 Q0 -49 -13 -44 Z" fill={PALETTE.palm} {...ink} />
      {/* arms */}
      {arm === "down" && (
        <>
          <Limb d="M-12 -50 Q-18 -40 -17 -28" scale={scale} width={7} color={PALETTE.trouser} />
          <Limb d="M12 -50 Q18 -40 17 -28" scale={scale} width={7} color={PALETTE.trouser} />
        </>
      )}
      {/* head */}
      <rect x={-4} y={-60} width={8} height={7} fill={PALETTE.skinDark} {...ink} />
      <circle cx={0} cy={-68} r={11} fill={PALETTE.ink} />
      {facing === "front" ? (
        <>
          <circle cx={0} cy={-66} r={9.5} fill={PALETTE.skin} {...ink} />
          <path d="M-9.5 -68 Q0 -78 9.5 -68 Q0 -73 -9.5 -68 Z" fill={PALETTE.ink} />
          <circle cx={-3.6} cy={-67} r={1.3} fill={PALETTE.ink} />
          <circle cx={3.6} cy={-67} r={1.3} fill={PALETTE.ink} />
          <path d="M-2.5 -61 Q0 -59.5 2.5 -61" fill="none" stroke={PALETTE.ink} strokeWidth={1.3 / scale} strokeLinecap="round" />
        </>
      ) : (
        <path d="M-9.5 -67 Q0 -78 9.5 -67 Q0 -71 -9.5 -71 Z" fill={PALETTE.ink} />
      )}
    </g>
  );
}

/* --------------------------------------------------------------- misc --- */

/** A shelf of jars for the wall behind the counter. */
export function JarShelf({ x, y, count = 4, gap = 26 }: At & { count?: number; gap?: number }) {
  const tint = [PALETTE.tea, PALETTE.milk, PALETTE.glass, PALETTE.palm];
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`translate(${x + i * gap} ${y})`}>
          <rect x={-9} y={-22} width={18} height={22} rx={2} fill={tint[i % tint.length]} {...INK} />
          <rect x={-10} y={-26} width={20} height={5} rx={2} fill={PALETTE.steel} {...INK} />
        </g>
      ))}
      <rect x={x - 16} y={y} width={gap * (count - 1) + 32} height={5} fill={PALETTE.wood} {...INK} />
    </g>
  );
}

/** The counter the whole shop happens across. */
export function Counter({ y, height = 200 }: { y: number; height?: number }) {
  return (
    <g>
      <rect x={0} y={y} width={320} height={height - y} fill={PALETTE.wood} {...INK} />
      <rect x={0} y={y} width={320} height={9} fill={PALETTE.woodDark} {...INK} />
      <path
        d={`M0 ${y + 30} h320 M0 ${y + 58} h320 M0 ${y + 86} h320`}
        stroke={PALETTE.woodDark}
        strokeWidth={2}
        opacity={0.8}
      />
      <rect x={0} y={y + 9} width={320} height={3} fill={PALETTE.teaLight} opacity={0.5} />
    </g>
  );
}

/** Group helper: draw children inside a translated frame. */
export function Frame({ x, y, scale = 1, children }: At & { children: ReactNode }) {
  return <g transform={place({ x, y, scale })}>{children}</g>;
}
