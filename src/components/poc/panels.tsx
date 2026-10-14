/**
 * The seven tea-shop panels (POC, branch poc-visuals). One panel per beat
 * of the scene, each with its own camera so the sequence reads as a comic
 * strip rather than one repeated picture: wide street, medium at the
 * counter, over the shoulder, close on the glass, the price, and out.
 *
 * Nothing here moves. Composition is the only thing carrying the beat, and
 * the counter is always drawn over the chettan so he reads as standing
 * behind it rather than in front of it.
 */

import { PALETTE } from "./palette";
import {
  Chettan,
  Counter,
  Glass,
  GlassRow,
  Hand,
  INK,
  JarShelf,
  Kettle,
  Learner,
  Limb,
  Palm,
  Road,
  ShopFront,
  Sky,
  SugarBowl,
} from "./parts";

export type PanelId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Shop interior: cream wall, a shade band, and a hanging bulb. The bulb
 * takes an x so a panel can keep it clear of whoever is in the middle of
 * the frame; `null` drops it for the close-up.
 */
function Wall({ bulb = 150 }: { bulb?: number | null }) {
  return (
    <g>
      <rect x={0} y={0} width={320} height={200} fill={PALETTE.wall} />
      <rect x={0} y={0} width={320} height={16} fill={PALETTE.wallShade} />
      {bulb !== null && (
        <g>
          <path d={`M${bulb} 16 v34`} stroke={PALETTE.ink} strokeWidth={1.6} />
          <path d={`M${bulb - 12} 50 h24 l-5 12 h-14 Z`} fill={PALETTE.steel} {...INK} />
          <circle cx={bulb} cy={66} r={6} fill={PALETTE.sun} {...INK} />
          <circle cx={bulb} cy={66} r={11} fill={PALETTE.sun} opacity={0.25} />
        </g>
      )}
    </g>
  );
}

/**
 * The near shoulder and the back of the learner's head, cropped by the
 * frame, used to shoot the over-the-shoulder beat. Slate shirt, green
 * collar, dark hair: the same three shapes the learner has in the wide
 * panels, so the mass in the corner reads as them and not as a dark lump.
 */
function Foreground() {
  return (
    <g>
      <path d="M-12 200 Q-10 132 44 122 Q86 114 100 146 L104 200 Z" fill={PALETTE.trouser} {...INK} />
      <path d="M20 136 Q44 129 68 136 L44 168 Z" fill={PALETTE.palm} />
      <circle cx={40} cy={104} r={30} fill={PALETTE.ink} />
    </g>
  );
}

/* ------------------------------------------------------------- panels --- */

function Panel1() {
  return (
    <g>
      <Sky />
      <Palm x={272} y={148} scale={0.86} />
      <ShopFront x={-6} y={4} scale={0.96} />
      {/* the chettan in the hatch, then the counter lip back over him */}
      <Chettan x={132} y={146} scale={0.46} />
      <rect x={90} y={138} width={88} height={11} fill={PALETTE.wood} {...INK} />
      <Road y={150} />
      <Learner x={232} y={196} scale={0.86} arm="raise" />
    </g>
  );
}

function Panel2() {
  return (
    <g>
      <Wall bulb={232} />
      <JarShelf x={44} y={58} count={4} gap={30} />
      <Chettan x={138} y={152} scale={0.92} arms="hold" />
      <Counter y={150} />
      <GlassRow x={26} y={149} count={4} gap={17} />
      <Kettle x={272} y={149} scale={1.05} />
    </g>
  );
}

function Panel3() {
  return (
    <g>
      <Wall />
      <JarShelf x={214} y={54} count={3} gap={30} />
      <Chettan x={186} y={154} scale={0.98} arms="hold" />
      <Counter y={152} />
      <Kettle x={44} y={151} scale={0.9} />
      <SugarBowl x={252} y={151} scale={1.15} />
      <Foreground />
    </g>
  );
}

/**
 * Close on the glass. The depth is the whole point: the rank of glasses
 * and the kettle sit on the far edge of the counter at counter scale, the
 * glass the chettan has just set down is pushed right up to the camera,
 * and his hand is still in the frame leaving it. The counter is set lower
 * here than in the medium panels so the near edge, not a slab of wood,
 * fills the bottom of the frame.
 */
function Panel4() {
  return (
    <g>
      <Wall bulb={null} />
      <Kettle x={288} y={124} scale={1.05} />
      <GlassRow x={28} y={124} count={5} gap={26} scale={1.1} />
      <Counter y={126} />
      <Glass x={122} y={196} scale={3.4} steam />
      <Limb d="M320 146 Q244 150 202 162" scale={1} width={13} />
      <Hand x={182} y={164} scale={2} />
    </g>
  );
}

function Panel5() {
  return (
    <g>
      <Wall bulb={252} />
      <JarShelf x={72} y={56} count={4} gap={30} />
      <Chettan x={196} y={152} scale={0.94} arms="lean" />
      <Counter y={150} />
      <GlassRow x={252} y={149} count={3} gap={17} />
      {/* the learner's glass, close enough to the camera to run off the frame */}
      <Glass x={66} y={204} scale={2.2} steam />
    </g>
  );
}

function Panel6() {
  return (
    <g>
      <Wall bulb={272} />
      <JarShelf x={54} y={60} count={3} gap={32} />
      <Chettan x={160} y={156} scale={1.16} arms="spread" />
      <Counter y={154} />
      <GlassRow x={252} y={153} count={3} gap={17} />
    </g>
  );
}

function Panel7() {
  return (
    <g>
      <Sky />
      <Palm x={54} y={140} scale={0.7} />
      <Palm x={300} y={146} scale={0.6} flip />
      <ShopFront x={-10} y={26} scale={0.74} />
      <Chettan x={98} y={132} scale={0.36} />
      <rect x={66} y={126} width={66} height={9} fill={PALETTE.wood} {...INK} />
      <Road y={136} />
      <Learner x={228} y={190} scale={0.78} facing="back" />
    </g>
  );
}

const PANELS: Record<PanelId, () => React.JSX.Element> = {
  1: Panel1,
  2: Panel2,
  3: Panel3,
  4: Panel4,
  5: Panel5,
  6: Panel6,
  7: Panel7,
};

/**
 * The stage: fixes the camera, not the content. Panels share one viewBox so
 * the frame never jumps between beats.
 */
export function ScenePanel({ id, label }: { id: PanelId; label: string }) {
  const Panel = PANELS[id];
  return (
    <svg viewBox="0 0 320 200" className="block h-auto w-full" role="img" aria-label={label}>
      <Panel />
    </svg>
  );
}
